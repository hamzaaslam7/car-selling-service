const catchAsync = require('../utils/catchAsync');
const { promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const keys = require("../config/key");
const appError = require('../utils/appError');
 module.exports = catchAsync(async (req, res, next) => {
    let token;
    // Getting Token and check of it ,s there
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; 
    }
    if (!token) {
        return next(new appError('you are not logged in! Please log into get access',401));
    }
    // verification  token
    const decoded = await promisify(jwt.verify)(token, keys.JWT_SECRET);
    
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new appError('The user belonging to this token does no longer exist',401));
    }
    // GRANT access  to  protect route
    req.user = currentUser;
    next();   
});
