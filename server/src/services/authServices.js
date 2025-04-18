const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const { generateToken, verifyToken } = require("../helpers/jwtHelpers");
const generatePasswordResetUrl = require("../helpers/verification/passwordResetUrl");
const {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = require("../config/index");
const CustomErrorHandler = require("../lib/CustomErrorHandler");
const { sendPasswordReset } = require("../helpers/emailHelpers");

const updateUserPassword = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomErrorHandler("User does not exist", 404);
  }

  if (user) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (hashedPassword) {
      if (!user.password) {
        user.password = hashedPassword;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        user.isVerified = true;

        await user.save();
        return user;
      } else {
        if (!user.resetPasswordToken) {
          throw new CustomErrorHandler(
            "You have not requested for a password reset",
            400
          );
        }
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        return user;
      }
    }
  }
};

const userLogin = async (email, password) => {
  // try {
  const userExist = await User.findOne({ email });

  if (!userExist) {
    throw new CustomErrorHandler("User with this email does not exists", 403);
  }

  const passwordMatch = await bcrypt.compare(password, userExist.password);

  if (!userExist.isVerified) {
    throw new CustomErrorHandler("User is not verified", 403);
  }

  if (!passwordMatch) {
    throw new CustomErrorHandler("Invalid Login Credentials", 403);
  }

  const userData = {
    userId: userExist._id,
    firstName: userExist.firstName,
    lastName: userExist.lastName,
    email: userExist.email,
    isVerified: userExist.isVerified,
    profilePicture: userExist.profilePicture,
  };

  const accessToken = generateToken(
    userData,
    `${ACCESS_TOKEN_EXPIRES_IN}m`,
    JWT_SECRET
  );

  const refreshToken = generateToken(
    userData,
    `${REFRESH_TOKEN_EXPIRES_IN}h`,
    JWT_SECRET
  );

  const refreshTokenExpiry =
    Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRES_IN * 60 * 60;

  return { accessToken, refreshToken, refreshTokenExpiry };
};

const newAccessToken = async (headers) => {
  try {
    if (headers.split(" ")[0] !== "Bearer") {
      throw new CustomErrorHandler("Invalid Token", 403);
    }

    const refreshToken = headers.split(" ")[1];
    const verifiedPayload = verifyToken(refreshToken, JWT_SECRET);

    if (!verifiedPayload) {
      throw new CustomErrorHandler("Invalid Token", 403);
    }

    const payLoad = {
      userId: verifiedPayload.userId,
      firstName: verifiedPayload.firstName,
      lastName: verifiedPayload.lastName,
      email: verifiedPayload.email,
      isVerified: verifiedPayload.isVerified,
      // profilePicture: verifiedPayload.profilePicture,
    };

    // generate new access token
    const accessToken = generateToken(
      payLoad,
      `${ACCESS_TOKEN_EXPIRES_IN}h`,
      JWT_SECRET
    );

    return { accessToken, payLoad };
  } catch (error) {
    console.log(error);
    throw new CustomErrorHandler("Internal Server Error", 500);
  }
};

const passwordReset = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    const resetPasswordData = await generatePasswordResetUrl(
      user._id.toString()
    );

    if (resetPasswordData) {
      user.resetPasswordToken = resetPasswordData.resetPasswordToken;
      user.resetPasswordExpires = resetPasswordData.expiresAt;

      await user.save();

      await sendPasswordReset(user.email, resetPasswordData.resetPasswordUrl);
      return { email: user.email };
    }
  }
};

module.exports = {
  updateUserPassword,
  userLogin,
  newAccessToken,
  passwordReset,
};
