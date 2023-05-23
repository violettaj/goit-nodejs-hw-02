const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: process.env.SENDGRID_EMAIL };

  try {
    await sgMail.send(email);

    return true;
  } catch (error) {
    return "Failed to send verification email";
  }
};

module.exports = sendEmail;
