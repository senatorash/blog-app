const { verifyToken } = require("../helpers/jwtHelpers");
const { JWT_SECRET } = require("../config/index");
const CustomErrorHandler = require("../lib/CustomErrorHandler");

const requireSignin = async (req, res, next) => {
  try {
    const { a_t } = req.cookies;

    if (!a_t) {
      throw new CustomErrorHandler("Access Denied", 403);
    }

    const payload = verifyToken(a_t, JWT_SECRET);

    if (!payload) {
      throw new CustomErrorHandler("Access Denied", 403);
    }

    req.user = payload;

    next();
  } catch (error) {
    throw new CustomErrorHandler("Invalid token", 401);
  }
};

module.exports = requireSignin;
