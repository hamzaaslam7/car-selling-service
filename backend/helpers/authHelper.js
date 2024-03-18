const jwt = require("jsonwebtoken");
const keys = require("../config/key");
exports.loginToken = (id) => {
  return jwt.sign({ id }, keys.JWT_SECRET, {
    expiresIn: keys.JWT_EXPIRES_IN,
  });
};
