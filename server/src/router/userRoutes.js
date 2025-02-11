const express = require("express");
const {
  createUser,
  verifyUser,
  getCurrentUser,
  uploadUserProfile,
  updateUserDetails,
  getUserByUsername,
  getUserById,
} = require("../controller/user/userController");
const { upload } = require("../middleware/multer");
const {
  validateUser,
  validateUpdateUserDetails,
  checkValidationErrors,
} = require("../middleware/validator/userValidator");
const requireSignin = require("../middleware/requireSignin");
const {
  checkUserAuth,
} = require("../middleware/authorization/userAuthorization");

const userRouter = express.Router();

userRouter.post("/", validateUser(), checkValidationErrors, createUser);
userRouter.post("/verify", verifyUser);
userRouter.get("/me", requireSignin, getCurrentUser);
userRouter.put(
  "/upload-image",
  requireSignin,
  checkUserAuth,
  upload.single("image"),
  uploadUserProfile
);
userRouter.put(
  "/change-userdetails",
  requireSignin,
  checkUserAuth,
  validateUpdateUserDetails(),
  checkValidationErrors,
  updateUserDetails
);
userRouter.get("/:username", getUserByUsername);
userRouter.get("/profile/:userId", getUserById);
module.exports = userRouter;
