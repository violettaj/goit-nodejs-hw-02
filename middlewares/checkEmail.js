const { catchAsync, emailValidator } = require("../helpers");

const checkEmail = catchAsync(async (req, res, next) => {
  if (!Object.keys(req.body).includes("email")) {
    return "Email is required";
  }

  if (!Object.keys(req.body).length > 1) {
    return "Too many fields. Only email is required";
  }

  const { error } = emailValidator(req.body);

  if (error) {
    return `${error.details[0].message}`;
  }

  next();
});

module.exports = checkEmail;
