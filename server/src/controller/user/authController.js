const {
  updateUserPassword,
  userLogin,
  newAccessToken,
  passwordReset,
} = require("../../services/authServices");

const {
  verifyPasswordResetToken,
} = require("../../services/verificationServices");

const setUserPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const updatedUser = await updateUserPassword(email, password);
    if (updatedUser) {
      return res.status(200).json({
        message:
          "Your Password has been Successfully Updated, sign in to continue enjoying our services",
      });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const authCredentials = await userLogin(email, password);

    if (authCredentials) {
      const cookieOptions = {
        expires: new Date(Date.now() + 60 * 60 * 1000),
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      };

      return res
        .status(200)
        .cookie("a_t", authCredentials.accessToken, cookieOptions)
        .json({
          message: "User Login Successfully",
          refreshToken: authCredentials.refreshToken,
          refreshTokenExpiry: authCredentials.refreshTokenExpiry,
        });
    }
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    return res.clearCookie("a_t").json({ message: "logged out successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const resetUserPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const response = await passwordReset(email);

    if (response) {
      return res.status(200).json({
        message: `A mail has been sent to ${response.email} to complete your request`,
      });
    }
  } catch (error) {
    next(error);
  }
};

const verifyPasswordResetData = async (req, res, next) => {
  try {
    const { userId, resetPasswordToken } = req.body;
    const response = await verifyPasswordResetToken(userId, resetPasswordToken);

    if (response) {
      return res.status(200).json({
        message: `Verification for ${response.email} is successful. Proceed to select a new password`,
        response,
      });
    }
  } catch (error) {
    next(error);
  }
};

const generateNewAccessToken = async (req, res, next) => {
  try {
    const headers = req.headers["authorization"];

    const authCredentials = await newAccessToken(headers);

    if (!authCredentials) {
      return res.status(403).json({ error: "Invalid Token" });
    }

    if (authCredentials) {
      const cookieOptions = {
        expires: new Date(Date.now() + 3600 * 1000),
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      };

      return res
        .cookie("a_t", authCredentials.accessToken, cookieOptions)
        .json({
          message: "New Access Token Generated Successfully",
          accessToken: authCredentials.accessToken,
          user: authCredentials.payLoad,
        });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  setUserPassword,
  loginUser,
  logoutUser,
  generateNewAccessToken,
  resetUserPassword,
  verifyPasswordResetData,
};
