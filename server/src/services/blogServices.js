const getPagination = require("../helpers/paginationHelpers");
const Blog = require("../model/blogModel");

const createNewBlog = async (title, description, content, userId) => {
  const blogData = { title, description, content, user: userId };

  const blog = new Blog(blogData);
  await blog.save();
  if (blog) {
    return blog;
  }
};

const allBlogs = async (skip, limit) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "email _id");

    return blogs;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const blogById = async (blogTitle) => {
  try {
    const blog = await Blog.findOne({ title: blogTitle });
    if (!blog) {
      throw new Error();
    }
    return res.status(200).json({ message: "Blog found successfully", blog });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const publishedState = async (blogId) => {
  try {
    const blog = await Blog.findById(blogId);
    return blog;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkBlogExistByTitle = async (blogTitle) => {
  try {
    const blog = await Blog.findOne({ title: blogTitle });
    if (!blog) {
      throw new Error();
    }
    return blog;
  } catch (error) {
    throw new Error();
  }
};

module.exports = {
  createNewBlog,
  allBlogs,
  blogById,
  publishedState,
  checkBlogExistByTitle,
};
