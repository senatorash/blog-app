const User = require("../../../model/userModel");
const verifyGoogleToken = require("../../../helpers/authHelpers");
const { generateToken } = require("../../../helpers/jwtHelpers");
const { updateUserProfileImage } = require("../../../services/userServices");
const generateUrl = require("../../../helpers/verification/verificationUrl");
const { sendVerification } = require("../../../helpers/emailHelpers");
const { ACCESS_TOKEN_EXPIRES_IN, JWT_SECRET } = require("../../../config");

const googleAuth = async (req, res, next) => {
  const { token } = req.body;
  const decodedToken = decodeURIComponent(token);

  try {
    // Verify Google token
    const { email, given_name, family_name, picture } = await verifyGoogleToken(
      decodedToken
    );

    // Check if the user already exists
    const userExist = await User.findOne({ email });
    // console.log("User found in DB:", userExist);

    if (userExist) {
      if (userExist.isVerified) {
        const userData = {
          userId: userExist._id,
          firstName: userExist.firstName,
          lastName: userExist.lastName,
          email: userExist.email,
          isVerified: userExist.isVerified,
          profilePicture: userExist.profilePicture,
        };
        const authToken = generateToken(
          userData,
          `${ACCESS_TOKEN_EXPIRES_IN}h`,
          JWT_SECRET
        );

        // Update profile picture
        await updateUserProfileImage(userExist._id, userExist.profilePicture);

        const cookieOptions = {
          expires: new Date(Date.now() + 30 * 1000),
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "None",
          secure: true,
        };

        return res
          .cookie("a_t", authToken, cookieOptions)
          .status(200)
          .json({
            message: "User logged in successfully",
            // token: authToken,
            user: {
              id: userExist._id,
              firstName: userExist.firstName,
              lastName: userExist.lastName,
              email: userExist.email,
              profilePicture: userExist.profilePicture,
            },
          });
      }

      // If user exists but is not verified, send a verification email
      const verificationData = await generateUrl(userExist._id.toString());
      userExist.verificationToken = verificationData.verificationToken;
      userExist.verificationTokenExpires = verificationData.expiresAt;
      await userExist.save();

      await sendVerification(userExist.email, verificationData.verificationUrl);

      return res.status(400).json({
        message: "Account not verified. Verification email sent.",
      });
    }

    // If user does not exist, create a new one
    const uniqueSuffix = Math.round(Math.random() * 1e9);

    const newUser = new User({
      firstName: given_name,
      lastName: family_name,
      profilePicture: picture,
      email,
      username: `${email.split("@")[0]}-${uniqueSuffix}`,
    });

    const verificationData = await generateUrl(newUser._id.toString());
    newUser.verificationToken = verificationData.verificationToken;
    newUser.verificationTokenExpires = verificationData.expiresAt;

    await newUser.save();

    // Send verification email to the new user
    await sendVerification(newUser.email, verificationData.verificationUrl);

    return res.status(200).json({
      message: "User created successfully. Please verify your email.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = googleAuth;
