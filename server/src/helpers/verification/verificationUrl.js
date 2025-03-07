const {
  generateOtp,
  verificationExpires,
} = require("../../helpers/verification/randomCodeGenerator");
const envVariable = require("../../config/index");

const { FRONTEND_URL } = envVariable;

const generateToken = async () => {
  try {
    const verificationToken = generateOtp(60);
    const verificationTokenExpires = verificationExpires();

    const verificationData = { verificationToken, verificationTokenExpires };
    return verificationData;
  } catch (error) {
    console.log(error);
  }
};

const generateUrl = async (userId) => {
  const TOKEN_SEPERATOR = ":";
  try {
    const verificationData = await generateToken();
    const verificationToken = `${verificationData?.verificationToken}${TOKEN_SEPERATOR}${userId}`;
    console.log(verificationToken);

    const encodedVerificationToken =
      Buffer.from(verificationToken).toString("base64");

    return {
      verificationUrl: `${FRONTEND_URL}/auth/verify/${encodedVerificationToken}`,
      verificationToken,
      expiresAt: verificationData?.verificationTokenExpires,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = generateUrl;
