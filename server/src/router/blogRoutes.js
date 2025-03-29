const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  getAllPublishedBlogs,
  updatePublishedState,
  getBlogByTitle,
  editBlog,
  deletedBlog,
} = require("../controller/blog/blogController");

const requireSignin = require("../middleware/requireSignin");
const {
  checkBlogOwnership,
} = require("../middleware/authorization/blogAuthorization");
const {
  validateBlog,
  checkValidationErrors,
} = require("../middleware/validator/blogValidator");
const blogRouter = express.Router();

blogRouter.post(
  "/create",
  requireSignin,
  validateBlog(),
  checkValidationErrors,
  createBlog
);

blogRouter.get("/all", getAllBlogs);
blogRouter.get("/published", getAllPublishedBlogs);
blogRouter.get("/title/:blogTitle", getBlogByTitle);
blogRouter.get(
  "/:blogId/user-blog-by-id",
  requireSignin,
  checkBlogOwnership,
  getBlogById
);
blogRouter.put(
  "/:blogId/publish",
  requireSignin,
  checkBlogOwnership,
  updatePublishedState
);
blogRouter.put(
  "/:blogId/edit",
  requireSignin,
  checkBlogOwnership,
  validateBlog(),
  checkValidationErrors,
  editBlog
);
blogRouter.delete(
  "/:blogId/delete",
  requireSignin,
  checkBlogOwnership,
  deletedBlog
);

module.exports = blogRouter;
