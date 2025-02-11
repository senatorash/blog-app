const Blog = require("../model/blogModel");

const createNewBlog = async (title, description, content, userId) => {
  const blogData = { title, description, content, user: userId };

  const blog = new Blog(blogData);
  await blog.save();
  if (blog) {
    return blog;
  }
};

module.exports = { createNewBlog };
