const User = require("../../../model/userModel");
const verifyToken = require("../../../helpers/authHelpers");

const googleAuth = async (req, res, next) => {
  const { token } = req.body;
  const decodedToken = decodeURIComponent(token);
  try {
    const { firstName, lastName, email, profilePicture } = await verifyToken(
      decodedToken
    );

    const userExist = await User.findOne({ email });

    if (userExist) {
      if (userExist.isVerified) {
        return res
          .status(403)
          .json({ error: "Account not verified. Please verify your email" });
      }

      const authToken = generateToken({});
    }

    if (userExist) {
      return res.status(403).json({ error: "User already Exists" });
    }

    const newUser = new User({
      firstName: given_name,
      lastName: family_name,
      profilePicture: picture,
      email,
    });

    await newUser.save();

    if (!newUser) {
      return res.status(400).json({ error: "login failed" });
    }
    return res.status(200).json({ message: "User Login successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = googleAuth;
