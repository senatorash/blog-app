const Blog = require("../../model/blogModel");
const getPagination = require("../../helpers/paginationHelpers");
const {
  createNewBlog,
  allBlogs,
  blogById,
  checkBlogExistByTitle,
  publishedState,
  updateBlogData,
  removeBlog,
} = require("../../services/blogServices");

const createBlog = async (req, res, next) => {
  try {
    const { title, description, category, content } = req.body;
    const { userId } = req.user;
    console.log(userId);

    const createdBlog = await createNewBlog(
      title,
      description,
      category,
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

const getAllBlogs = async (req, res, next) => {
  try {
    const { skip, limit } = getPagination(req.query);
    const blogs = await allBlogs(skip, limit);
    if (!blogs) {
      return res.status(404).json({ message: "No blogs found" });
    }

    return res
      .status(200)
      .json({ message: "blogs Fetched successfully", blogs });
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const blog = await blogById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog Found Successfully", blog });
  } catch (error) {
    next(error);
  }
};

const getBlogByTitle = async (req, res, next) => {
  try {
    const { blogTitle } = req.params;
    const blog = await checkBlogExistByTitle(blogTitle);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog found successfully", blog });
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
      .skip(skip)
      .limit(limit);
    return res
      .status(200)
      .json({ message: "Published blogs fetched successfully", blogs });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const editBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { title, description, content } = req.body;

    const blog = await updateBlogData(blogId, title, description, content);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    next(error);
  }
};

const deletedBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const blog = await removeBlog(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog deleted successfully", blog });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  getAllPublishedBlogs,
  updatePublishedState,
  getBlogByTitle,
  editBlog,
  deletedBlog,
};
