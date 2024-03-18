const express = require("express");
const route = express.Router();
const protect = require('../middlewares/protect');
const { createCarValidate } = require("../middlewares/validations/carValidate");
const { createCar } = require("../controllers/carController");

route.use(protect)
route.post('/create', createCarValidate, createCar);

module.exports = route;
