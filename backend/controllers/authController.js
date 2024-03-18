const User = require("../models/userModel");
const { loginToken } = require("../helpers/authHelper");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const keys = require("../config/key");

const createSendToken = (user, statuscode, res) => {
  const token = loginToken(user._id);
  const cookieOption = {
    expires: new Date(
      Date.now() + keys.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOption.secure = true;
  res.cookie("jwt", token, cookieOption);
  user.password = undefined;
  res.status(statuscode).json({
    status: "success",
    token,
    data: user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
});

exports.Login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new appError("email and password not be a null"), 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError("Incorrect email or Password", 401));
  }
  // 3 if every thing is ok, send token to client
  createSendToken(user, 200, res);
});
