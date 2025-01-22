const jwt = require("jsonwebtoken");

const generateToken = (payLoad, expiresIn, secret) => {
  try {
    const token = jwt.sign(payLoad, secret, { expiresIn });
    return token;
  } catch (error) {}
};

const verifyToken = (token, secret) => {
  try {
    const payLoad = jwt.verify(token, secret);
    return payLoad;
  } catch (error) {}
};

module.exports = { generateToken, verifyToken };
