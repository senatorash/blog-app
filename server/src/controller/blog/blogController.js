const createNewBlog = require("../../services/blogServices");

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

module.exports = { createBlog };
