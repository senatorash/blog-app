const express = require("express");
const {
  setUserPassword,
  loginUser,
  logoutUser,
  verifyPasswordResetData,
  generateNewAccessToken,
  resetUserPassword,
} = require("../controller/user/authController");
const {
  validateLogin,
  validatePassword,
  validateUserResetPassword,
} = require("../middleware/validator/authValidator");
const {
  checkValidationErrors,
} = require("../middleware/validator/userValidator");
const requireSignin = require("../middleware/requireSignin");
const authRouter = express.Router();

authRouter.post(
  "/set-password",
  validatePassword(),
  checkValidationErrors,
  setUserPassword
);

authRouter.post("/login", validateLogin(), checkValidationErrors, loginUser);
authRouter.post("/logout", requireSignin, logoutUser);
authRouter.post(
  "/reset-password",
  validateUserResetPassword(),
  checkValidationErrors,
  resetUserPassword
);
authRouter.post("/verify-reset-password-token", verifyPasswordResetData);
authRouter.post("/access-token", generateNewAccessToken);

module.exports = authRouter;
