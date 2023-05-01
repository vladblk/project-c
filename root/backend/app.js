const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const destinationRouter = require('./routes/destinationRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

// security headers middleware
app.use(helmet());

// limit the api calls
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests registered. Please try again later!',
});

// Apply the rate limiting middleware to all requests
app.use('/api', apiLimiter);

// parse data from body into req.body middleware
app.use(express.json({ limit: '10kb' }));

// data sanitization against query injections
app.use(mongoSanitize());

// data sanitization against xss
app.use(xss());

// prevent paramter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
      'country',
    ],
  })
);

// mount the destination router as a middleware
app.use('/api/v1/destinations', destinationRouter);

// mount the user router as a middleware
app.use('/api/v1/users', userRouter);

// handle unhandled routes
app.all('*', (req, res, next) => {
  const errorMessage = `Could not find ${req.originalUrl} route on this server!`;
  const errorStatusCode = 404;
  const error = new AppError(errorMessage, errorStatusCode);

  next(error);
});

// error handler middleware
app.use(globalErrorHandler);

module.exports = app;
