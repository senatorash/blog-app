const {
  generateOtp,
  verificationExpires,
} = require("../../helpers/verification/randomCodeGenerator");
const envVariable = require("../../config/index");

const { FRONTEND_URL } = envVariable;

const generateToken = async () => {
  try {
    const resetPasswordToken = generateOtp(60);
    const resetPasswordTokenExpires = verificationExpires();

    const resetPasswordData = { resetPasswordToken, resetPasswordTokenExpires };
    return resetPasswordData;
  } catch (error) {
    console.log(error);
  }
};

const generatePasswordResetUrl = async (userId) => {
  const TOKEN_SEPERATOR = ":";

  try {
    const resetPasswordData = await generateToken();
    const resetPasswordToken = `${resetPasswordData?.resetPasswordToken}${TOKEN_SEPERATOR}${userId}`;

    const encodedPasswordResetToken =
      Buffer.from(resetPasswordToken).toString("base64");

    return {
      resetPasswordUrl: `${FRONTEND_URL}/auth/verify-reset-password/${encodedPasswordResetToken}`,
      resetPasswordToken,
      expiresAt: resetPasswordData.resetPasswordTokenExpires,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = generatePasswordResetUrl;
