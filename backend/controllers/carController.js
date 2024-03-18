const catchAsync = require("../utils/catchAsync");
const Car = require("../models/carModel");

exports.createCar = catchAsync(async (req, res, next) => {
  const newCar = await Car.create(req.body);
  return res.status(201).json({
    status: "success",
    data: newCar,
  });
});
