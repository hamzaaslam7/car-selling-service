const JOI = require("@hapi/joi");
const AppError = require("../../utils/appError");
const signUpSchema = JOI.object().keys({
  name: JOI.string().min(3).required(),
  email: JOI.string().email().required(),
  password: JOI.string().min(8).required(),
});

exports.signupValidate = (req, res, next) => {
  const result = signUpSchema.validate(req.body);
  if (result.error) {
    return next(new AppError(result.error.message, 400));
  }
  next();
};

const loginSchema = JOI.object().keys({
  email: JOI.string().email().required(),
  password: JOI.string().min(8).required(),
});

exports.loginValidate = (req, res, next) => {
  const result = loginSchema.validate(req.body);
  if (result.error) {
    return next(new AppError(result.error.message, 400));
  }
  next();
};
