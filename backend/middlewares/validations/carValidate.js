const JOI = require("@hapi/joi");
const AppError = require("../../utils/appError");
const carSchema = JOI.object().keys({
    carModel: JOI.string().min(3).required(),
    price:JOI.number().required(),
    phone:JOI.number().integer().max(99999999999).required(),
    city:JOI.string().required(),
    noOfCopy:JOI.number().min(1).max(10).required(),
    picture:JOI.array().items(JOI.string().uri()).min(1).required(),
});

exports.createCarValidate = (req, res, next) => {
  const result = carSchema.validate(req.body);
  if (result.error) {
    return next(new AppError(result.error.message, 400));
  }
  req.body.createdBy=req.user._id
  next();
};