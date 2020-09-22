const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // GET Token from Headers
  const token = req.header("x-auth-token");

  // check for token
  if (!token) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
