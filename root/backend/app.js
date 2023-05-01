const express = require('express');
const rateLimit = require('express-rate-limit');
const destinationRouter = require('./routes/destinationRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

app.use(express.json());

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
