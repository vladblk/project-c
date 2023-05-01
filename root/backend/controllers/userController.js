const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const filterBody = (obj, ...allowedFields) => {
  const filteredObj = {};

  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredObj[key] = obj[key];
    }
  });

  return filteredObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: { users },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // restrict user to change password from this route
  const { password, passwordConfirm } = req.body;

  if (password || passwordConfirm) {
    const message = 'You can not change the password from here!';
    const statusCode = 400;
    const error = new AppError(message, statusCode);
    return next(error);
  }

  // filter out unwanted fields from req.body
  // let the user change "name", "email"
  const filteredFields = filterBody(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(
    req.currentUser._id,
    filteredFields,
    {
      new: true,
      runValidators: true,
    }
  );

  // send response
  res.status(200).json({
    status: 'success',
    data: {
      user: {
        updatedUser,
      },
    },
  });
});
