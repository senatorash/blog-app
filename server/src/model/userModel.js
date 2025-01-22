const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      trim: true,
    },
    verificationTokenExpires: {
      type: Date,
      // default: Date.now(),
    },
    resetPasswordToken: {
      type: String,
      trim: true,
    },
    resetPasswordTokenExpires: {
      type: Date,
      // default: Date.now(),
    },
    profilePicture: {
      type: String,
    },
    about: {
      type: String,
      trim: true,
    },
    followers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String,
        name: String,
      },
    ],
    following: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String,
        name: String,
      },
    ],
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
