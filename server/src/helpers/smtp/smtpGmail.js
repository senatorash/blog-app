const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const envVariable = require("../../config/index");

const {
  CLIENT_ID,
  CLIENT_SECRET,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  LINK,
  SMTP_USER,
} = envVariable;

const Oauth2 = google.auth.OAuth2;

const myOauth2Client = new Oauth2(CLIENT_ID, CLIENT_SECRET, LINK);

myOauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: SMTP_USER,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: ACCESS_TOKEN,
  },
});

module.exports = transport;
