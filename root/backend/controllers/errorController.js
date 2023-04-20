require('dotenv').config();
const AppError = require('../utils/appError');

const handleCastError = (err) => {
  const message = `No destination found with ${err.path}: ${err.value}`;
  const statusCode = 404;
  const error = new AppError(message, statusCode);
  return error;
};

const handleValidationError = (err) => {
  let message = '';
  const statusCode = 400;

  for (const key in err.errors) {
    const keyObj = err.errors[key];
    message += keyObj.message + ' ';
  }

  const error = new AppError(message, statusCode);
  return error;
};

const handleDuplicateKeyError = (err) => {
  const message = `A destination with the "${err.keyValue['name']}" name already exists!`;
  const statusCode = 400;
  const error = new AppError(message, statusCode);
  return error;
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, known error
  if (err.isOperational) {
    // send the error to client
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming, unknown error
  if (!err.isOperational) {
    // 1) log the error
    console.error(err);
    // 2) send generic error mesage to client
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let errObj = Object.assign(err);

    // handle CastError
    if (err.name === 'CastError') {
      errObj = handleCastError(err);
    }

    // handle ValidationError
    if (err.name === 'ValidationError') {
      errObj = handleValidationError(err);
    }

    // handle DuplicateKey error
    if (err.code === 11000 || err.codeName === 'DuplicateKey') {
      errObj = handleDuplicateKeyError(err);
    }

    sendErrorProd(errObj, res);
  }
};
