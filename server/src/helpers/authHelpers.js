const { OAuth2Client } = require("google-auth-library");
const envVariable = require("../config/index");
const { CLIENT_ID, CLIENT_SECRET } = envVariable;
const client = new OAuth2Client(CLIENT_SECRET);

const verifyToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const { given_name, family_name, email, picture } = ticket.getPayload();
  const userData = {
    firstName: given_name,
    lastName: family_name,
    email,
    profilePicture: picture,
  };
  return userData;
};

module.exports = verifyToken;
