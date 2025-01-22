const { body, validationResult, check } = require("express-validator");

const validateUser = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("First Name is required")
      .trim()
      .escape(),

    body("lastName")
      .notEmpty()
      .withMessage("Last Name is required")
      .trim()
      .escape(),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid Email Address")
      .normalizeEmail(),

    body("gender").notEmpty().withMessage("gender is required").trim().escape(),
  ];
};

const validateUpdateUserDetails = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("First Name is required")
      .trim()
      .escape(),

    body("lastName")
      .notEmpty()
      .withMessage("Last Name is required")
      .trim()
      .escape(),

    body("gender").notEmpty().withMessage("gender is required").trim().escape(),
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
  validateUser,
  checkValidationErrors,
  validateUpdateUserDetails,
};
