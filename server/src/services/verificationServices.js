const CustomErrorHandler = require("../lib/CustomErrorHandler");
const User = require("../model/userModel");

const verifyUserToken = async (userId, verificationToken) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new CustomErrorHandler("user does not exist", 404);
  }
  if (!user.verificationToken) {
    throw new CustomErrorHandler("token does not exist or is invalid", 401);
  }

  const now = new Date();
  const verificationTokenExpiryDate = user.verificationTokenExpires;

  if (now >= verificationTokenExpiryDate) {
    await User.findByIdAndDelete(userId);
    throw new CustomErrorHandler("expired verification token", 410);
  }

  if (user.verificationToken !== `${verificationToken}:${userId}`) {
    throw new CustomErrorHandler("invalid verification token", 401);
  }
  return { email: user.email };
};

const verifyPasswordResetToken = async (userId, resetPasswordToken) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new CustomErrorHandler("User does not exist", 404);
  }

  if (!user.resetPasswordToken) {
    throw new CustomErrorHandler("Token does not exist or It's invalid");
  }

  const now = new Date();
  const resetTokenExpiryDate = user.resetPasswordExpires;

  if (now >= resetTokenExpiryDate) {
    await User.findByIdAndDelete(userId);
    throw new CustomErrorHandler("expired verification token", 410);
  }

  if (user.resetPasswordToken !== `${resetPasswordToken}:${userId}`) {
    throw new CustomErrorHandler("invalid verification token", 401);
  }
  return { email: user.email };
};

module.exports = { verifyUserToken, verifyPasswordResetToken };
