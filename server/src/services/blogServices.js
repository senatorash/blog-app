const Blog = require("../model/blogModel");
const CustomErrorHandler = require("../lib/CustomErrorHandler");

const createNewBlog = async (title, description, category, content, userId) => {
  const blogData = { title, description, category, content, user: userId };
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
  } catch (error) {}
};

const blogById = async (blogId) => {
  try {
    const blog = await Blog.findById({ blogId });
    if (!blog) {
      throw new CustomErrorHandler("Blog not found", 404);
    }
    return blog;
  } catch (error) {}
};

const publishedState = async (blogId) => {
  try {
    const blog = await Blog.findById(blogId);
    return blog;
  } catch (error) {}
};

const checkBlogExistByTitle = async (blogTitle) => {
  try {
    const blog = await Blog.findOne({ title: blogTitle });
    if (!blog) {
      throw new CustomErrorHandler("Blog not found", 404);
    }
    return blog;
  } catch (error) {
    throw error;
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
