const express = require('express');
const destinationRouter = require('./routes/destinationRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

app.use(express.json());

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
