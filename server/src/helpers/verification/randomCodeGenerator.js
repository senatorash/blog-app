const crypto = require("crypto");
const generateOtp = (length) => {
  if (length < 1) {
    throw new Error("Minimum length of token is 1");
  }

  return crypto
    .randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/, "-")
    .substr(0, length);
};

const verificationExpires = () => {
  return new Date().getTime() + 5 * 60000 + 3600000;
};

module.exports = { generateOtp, verificationExpires };
