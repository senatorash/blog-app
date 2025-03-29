const { body, validationResult } = require("express-validator");

const validateBlog = () => {
  return [
    body("title").notEmpty().withMessage("Title is required").trim().escape(),
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .trim()
      .escape(),
    body("content")
      .notEmpty()
      .withMessage("Content is required")
      .trim()
      .escape(),
    body("category")
      .notEmpty()
      .withMessage("Category is required")
      .trim()
      .escape(),
  ];
};

const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      method: req.method,
      status: res.statusCode,
      errors: errors.errors[0].msg,
    });
  }
  next();
};

module.exports = {
  validateBlog,
  checkValidationErrors,
};
