
const express = require('express');
const cors = require('cors')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const app = express();
const globalErrorHandel = require('./controllers/errorController');
const AppError = require('./utils/appError');

app.use(cors())
// set security HTTP headers
app.use(helmet())

// global middleware use 
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message:'To many request from this api , please try again in an hour,'
})
 // limit request for same api
app.use('/api', limiter);
// Body parser reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// data sanitization against NoSql injection
app.use(mongoSanitize());

// data sanitization against NoSql injection
app.use(xss());
// prevent  parameter pollution
app.use(hpp({
    whitelist:['duration']
}));

// serving static file
app.use(express.static('./public'));

app.use('/api/v1/auth', require('./routes/authRouter'));
app.use('/api/v1/car', require('./routes/carRouter'));

// view routes
app.get('/', (req, res) => {
    res.status(200).render('base');
})

// middeware error handle not matching route
app.all('*', (req, res, next) => {
    next(new AppError(`can not find ${req.originalUrl} on this server `,400));
});

// Global error handle middaware
app.use(globalErrorHandel);

module.exports = app;
