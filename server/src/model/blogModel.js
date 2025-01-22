const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    title: {
      type: String,
    },
    Description: {
      type: String,
    },
    category: {
      type: String,
    },
    content: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },

    user: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      username: String,
      firstName: String,
      lastName: String,
    },
    reactions: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        username: String,
        reaction: String,
      },
    ],
    totalRead: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
