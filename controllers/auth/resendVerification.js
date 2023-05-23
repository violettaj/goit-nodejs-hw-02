const User = require("./models/user");
const { catchAsync, sendEmail } = require("../../helpers");

const resendVerification = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return "User with such email doesn't exist";
  }

  if (user.verify) {
    return "Verification has already been passed";
  }

  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a href="http://localhost:3001/api/users/verify/${user.verificationToken}" target="_blank">Confirm email</a>`,
  };

  await sendEmail(mail);

  res.status(200).json({ message: "Verification email sent" });
});

module.exports = resendVerification;
