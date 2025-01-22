const nodemailer = require("nodemailer");
const envVariable = require("../../config/index");

const { SMTP_HOST, SMTP_PORT, SMTP_PASS, SMTP_USER } = envVariable;
const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT || 2525,
  secure: false,

  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

module.exports = transport;
