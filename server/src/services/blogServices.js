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

const blogById = async (blogId) => {
  try {
    const blog = await Blog.findById({ blogId });
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

const updateBlogData = async (blogId, title, description, content) => {
  try {
    const blogData = { title, description, content };

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, blogData);

    if (updatedBlog) {
      return updatedBlog;
    }
  } catch (error) {}
};

const removeBlog = async (blogId) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (deletedBlog) {
      return deletedBlog;
    }
  } catch (error) {}
};

module.exports = {
  createNewBlog,
  allBlogs,
  blogById,
  publishedState,
  checkBlogExistByTitle,
  updateBlogData,
  removeBlog,
};
