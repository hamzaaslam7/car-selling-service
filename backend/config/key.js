switch (process.env.NODE_ENV) {
  case "production":
    module.exports = require("./prod");
    break;
  default:
    module.exports = require("./dev");
    break;
}
