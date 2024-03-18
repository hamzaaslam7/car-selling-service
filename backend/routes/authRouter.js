const express = require("express");
const route = express.Router();
const { signup,Login} = require('../controllers/authController');
const protect = require('../middlewares/protect');
const { signupValidate } = require("../middlewares/validations/authValidate");


route.post('/signup', signupValidate, signup);
route.post('/login', Login);
route.use(protect)


module.exports = route;
