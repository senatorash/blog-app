const Blog = require("../../model/blogModel");
const CustomErrorHandler = require("../../lib/CustomErrorHandler");

const checkBlogOwnership = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    if (req.user) {
      const blog = await Blog.findById(blogId);

      if (blog.user !== req.user) {
        return next(new CustomErrorHandler("Unauthorized", 401));
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkBlogOwnership };
