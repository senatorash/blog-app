const { verifyToken } = require("../helpers/jwtHelpers");
const { JWT_SECRET } = require("../config/index");
const CustomErrorHandler = require("../lib/CustomErrorHandler");

const requireSignin = async (req, res, next) => {
  try {
    const { a_t } = req.cookies;

    if (!a_t) {
      return next(new CustomErrorHandler("Access Denied", 403));
    }

    let payload;
    try {
      payload = verifyToken(a_t, JWT_SECRET);
    } catch (error) {
      console.log(error);
      return next(new CustomErrorHandler("Invalid token", 401));
    }

    req.user = payload;

    next();
  } catch (error) {
    console.log(error);
    return next(new CustomErrorHandler("Invalid token", 401));
  }
};

module.exports = requireSignin;
