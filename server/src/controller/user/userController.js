const CustomErrorHandler = require("../../lib/CustomErrorHandler");
const User = require("../../model/userModel");

const {
  createNewUser,
  updateUserProfileImage,
  userNameUpdate,
} = require("../../services/userServices");
const { verifyUserToken } = require("../../services/verificationServices");

const createUser = async (req, res) => {
  try {
    const { email, firstName, lastName, gender } = req.body;

    const createdUser = await createNewUser(firstName, lastName, email, gender);
    if (createdUser) {
      return res.status(201).json({
        message: `A mail has been sent to ${createdUser.email} to complete your registration process`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { userId, verificationToken } = req.body;

    const userIsVerified = await verifyUserToken(userId, verificationToken);
    if (userIsVerified) {
      return res.status(200).json({
        message: `verification for ${userIsVerified.email} is successful. Proceed to choose a valid password to complete registration`,
        userIsVerified,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const uploadUserProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const imagePath = "uploads/" + req.file.filename;
    const updatedUser = await updateUserProfileImage(userId, imagePath);

    if (updatedUser) {
      return res.status(200).json({
        message: "Profile image uploaded successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const updateUserDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, about, gender } = req.body;

    const updatedUser = userNameUpdate(
      userId,
      firstName,
      lastName,
      about,
      gender
    );
    if (updatedUser) {
      return res.status(200).json({
        message: "User profile updated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
      .select("-password")
      .populate("followers", _id)
      .populate("following", _id)
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user) {
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .select("-password")
      .populate("followers", _id)
      .populate("following", _id)
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user) {
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId)
      .select("-password")
      .populate("followers", "_id")
      .populate("following", "_id")
      .exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  verifyUser,
  getCurrentUser,
  uploadUserProfile,
  updateUserDetails,
  getUserByUsername,
  getUserById,
};
