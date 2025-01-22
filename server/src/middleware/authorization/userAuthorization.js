const User = require("../../model/userModel");
const checkUserAuth = async (req, res, next) => {
  try {
    if (req.user) {
      const currentUser = await User.findById(req.user.id);

      if (currentUser._id.toString() !== req.user.id) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        next();
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  checkUserAuth,
};
