const { basedir } = global;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require(`${basedir}/models/user`);
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify) {
    return res
      .status(409)
      .json({ status: "error", code: 401, message: `Email wrong!` });
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res
      .status(401)
      .json({
        status: "error",
        code: 401,
        message: `Password is wrong or not verified!`,
      });
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
