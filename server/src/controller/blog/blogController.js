Blog = require("../../model/blogModel");
const getPagination = require("../../helpers/paginationHelpers");
const Blog = require("../../model/blogModel");
const {
  createNewBlog,
  allBlogs,
  blogById,
  checkBlogExistByTitle,
  publishedState,
} = require("../../services/blogServices");

const createBlog = async (req, res, next) => {
  try {
    const { title, description, content } = req.body;
    const { userId } = req.user;

    const createdBlog = await createNewBlog(
      title,
      description,
      content,
      userId
    );

    if (createdBlog) {
      return res.status(201).json({
        message: "Blog created successfully",
        blog: createdBlog,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getBlogs = async (req, res, next) => {
  try {
    const { skip, limit } = getPagination(req.query);
    const getAllBlogs = await allBlogs(skip, limit);
    if (!getAllBlogs) {
      return res.status(404).json({ message: "No blogs found" });
    }

    return res.status(200).json("blogs Fetched successfully", getAllBlogs);
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const { blogTitle } = req.params;
    const blog = await blogById(blogTitle);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog Found Successfully", blog });
  } catch (error) {
    next(error);
  }
};

const updatePublishedState = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await publishedState(blogId);

    if (!blog) {
      return res.status();
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    return res
      .status(200)
      .json({ message: "Publish state updated successfully", blog });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllPublishedBlogs = async (req, res) => {
  try {
    const { skip, limit } = getPagination(req.query);
    const blogs = await Blog.find({ isPublished: true })
      .sort({ created: -1 })
      .skip(limit)
      .limit(limit);
    return res
      .status(200)
      .json({ message: "Published blogs fetched successfully", blogs });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  getAllPublishedBlogs,
  updatePublishedState,
};
