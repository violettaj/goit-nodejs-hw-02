const jwt = require("jsonwebtoken");

const { basedir } = global;
const User = require(`${basedir}/models/user`);
const secret = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return res
      .status(401)
      .json({ status: "error", code: 401, message: "Not authorized" });
  }
  try {
    const { id } = jwt.verify(token, secret);
    const user = await User.findById(id);
    if (!user || token !== user.token) {
      return res
        .status(401)
        .json({ status: "error", code: 401, message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(
      res
        .status(401)
        .json({ status: "error", code: 401, message: "Not authorized" })
    );
  }
};

module.exports = auth;
