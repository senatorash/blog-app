const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const { sendVerification } = require("../helpers/emailHelpers");
const generateUrl = require("../helpers/verification/verificationUrl");
const CustomErrorHandler = require("../lib/CustomErrorHandler");

const createNewUser = async (firstName, lastName, email, gender) => {
  try {
    // const { firstName, lastName, email, password, gender } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      if (!userExist.isVerified) {
        const verificationData = await generateUrl(userExist._id.toString());

        userExist.verificationToken = verificationData?.verificationToken;
        userExist.verificationTokenExpires = verificationData?.expiresAt;
        await userExist.save();
        await sendVerification(
          userExist.email,
          verificationData?.verificationUrl
        );
        return { email: userExist.email };
      }
      throw new CustomErrorHandler("User already exists", 404);
    }

    const uniqueSuffix = Math.floor(Math.random() * 1e9);
    const username = email.split("@")[0] + "-" + uniqueSuffix;

    const newUser = new User({
      email,
      firstName,
      lastName,
      gender,
      username,
    });
    const verificationData = await generateUrl(newUser._id.toString());

    newUser.verificationToken = verificationData?.verificationToken;
    newUser.verificationTokenExpires = verificationData?.expiresAt;

    await newUser.save();

    await sendVerification(newUser.email, verificationData?.verificationUrl);
    return { email: newUser.email, message: "User created successfully." };
  } catch (error) {
    throw new CustomErrorHandler("Internal Server Error", 500);
  }
};

const updateUserProfileImage = async (userId, imagePath) => {
  try {
    const user = await User.findById(userId)
      .select("-password")
      .populate("followers", "_id")
      .populate("following", "_id")
      .exec();

    if (!user) {
      throw new CustomErrorHandler("invalid user token", 403);
    }

    user.profilePicture = imagePath;
    await user.save();
    return user;
  } catch (error) {
    throw new CustomErrorHandler("Internal Server Error", 500);
  }
};

const userNameUpdate = async (userId, firstName, lastName, about) => {
  const user = await User.findById(userId)
    .select("-password")
    .populate("followers", "_id")
    .populate("following", "_id")
    .exec();

  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.about = about;
  }
  await User.save();
  return user;
};
module.exports = { createNewUser, updateUserProfileImage, userNameUpdate };
