const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const crypto = require('crypto');

const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createTokenSendResponse = async (user, statusCode, res) => {
  const jwtToken = await generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ), // convert value in JWT_COOKIE_EXPIRES_IN in milliseconds
    httpOnly: true,
  };

  // if node_env is production, set "secure: true"
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', jwtToken, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token: jwtToken,
    data: {
      user: user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, passwordChangedAt, role } =
    req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    passwordChangedAt,
    role,
  });

  await createTokenSendResponse(newUser, 201, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password are present
  if (!email || !password) {
    const message = 'Please provide email and password!';
    const statusCode = 400; // bad request
    const error = new AppError(message, statusCode);
    return next(error);
  }

  // 2) Get the user
  const user = await User.findOne({ email }).select('+password');

  // if user exists, compare the typed password at signin with user password at signin
  let isPasswordCorrect;

  if (user)
    isPasswordCorrect = await user.isPasswordCorrect(password, user.password);

  // 3) Check if email and password are valid
  if (!user || !isPasswordCorrect) {
    const message = 'Invalid user or password';
    const statusCode = 401; // unauthorized
    const error = new AppError(message, statusCode);
    return next(error);
  }

  // 4) If everything is good, generate token again and send response to client
  return await createTokenSendResponse(user, 200, res);
});

exports.signout = catchAsync(async (req, res, next) => {
  await res.cookie('jwt', 'logOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
  });
});

exports.protectRoute = catchAsync(async (req, res, next) => {
  // 1) Get headers and see if token it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies['jwt']) {
    token = req.cookies['jwt'];
  }

  if (!token) {
    const message = 'You are not signed in, please sign in!';
    const statusCode = 401;
    const error = new AppError(message, statusCode);
    return next(error);
  }

  // 2) Verify token
  const decodedPayload = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3) Check if the user still exists
  const currentUser = await User.findById(decodedPayload.id);

  if (!currentUser) {
    const message = 'Invalid user, please sign in!';
    const statusCode = 401;
    const error = new AppError(message, statusCode);
    return next(error);
  }

  // 4) Check if user changed password after the token was issued
  const isPasswordChangedAfterTokenIssue =
    currentUser.isPasswordChangedAfterTokenIssue(decodedPayload.iat);

  if (isPasswordChangedAfterTokenIssue) {
    const message = 'Password changed recently, please sign in again!';
    const statusCode = 401;
    const error = new AppError(message, statusCode);
    return next(error);
  }

  // If everything ok, gain access to protected route
  req.currentUser = currentUser;
  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // 1) check if there is a cookie
  if (req.cookies['jwt']) {
    // 2) Verify token
    const decodedPayload = await promisify(jwt.verify)(
      req.cookies['jwt'],
      process.env.JWT_SECRET
    );

    // 3) Check if the user still exists
    const currentUser = await User.findById(decodedPayload.id);

    if (!currentUser) return next();

    // 4) Check if user changed password after the token was issued
    const isPasswordChangedAfterTokenIssue =
      currentUser.isPasswordChangedAfterTokenIssue(decodedPayload.iat);

    if (isPasswordChangedAfterTokenIssue) return next();

    // A user is logged in
    res.locals.user = currentUser;
    next();
  }

  // no cookie, move to the next middleware
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      const message = 'You do not have permission to perform this action!';
      const statusCode = 403;
      const error = new AppError(message, statusCode);
      return next(error);
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // get the user by mail
  const user = await User.findOne({ email: req.body.email });

  // check if user exists
  if (!user) {
    const message = 'Invalid user, please try again!';
    const statusCode = 404;
    const error = new AppError(message, statusCode);
    return next(error);
  }

  // generate a reset password token
  const resetPasswordToken = user.createPasswordResetToken();

  // save the token and the expiration from createPasswordResetToken method to the user
  await user.save({ validateBeforeSave: false });

  // send the token to user email
  const resetPasswordURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/forgotPassword/${resetPasswordToken}`;

  await sendEmail({
    email: user.email,
    subject: 'Your password reset link.',
    message: `Hello! Here is your password reset link: ${resetPasswordURL}. If you did not request a password reset recently, please ignore this message!`,
  });

  // send response
  res.status(200).json({
    status: 'success',
    message: 'Reset password token sent correctly!',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // get the user by the reset password token
  // check the user is valid (the check for token expiration is done directly in the query)
  const hashedResetToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedResetToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    const message = 'Invalid user, please try again';
    const statusCode = 404;
    const error = new AppError(message, statusCode);
    return next(error);
  }

  // save the new password and remove the password reset token
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;

  // update the passwordChangedAt field in a pre save middlwware inside userModel

  // save the changes
  await user.save();

  // generate a new jasonwebtoken to sign in the user
  await createTokenSendResponse(user, 200, res);
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { passwordCurrent, password, passwordConfirm } = req.body;

  // 1) get the current user
  const user = await User.findById(req.currentUser._id).select('+password');

  // 2) check if user is valid
  if (!user) {
    const message = 'Invalid user, please try again!';
    const statusCode = 404;
    const error = new AppError(message, statusCode);
    return next(error);
  }

  // 3) check the posted password with the user password
  const isPasswordCorrect = await user.isPasswordCorrect(
    passwordCurrent,
    user.password
  );

  if (!isPasswordCorrect) {
    const message = 'Password is not correct, please try again!';
    const statusCode = 401;
    const error = new AppError(message, statusCode);
    return next(error);
  }

  // 4) update the user password
  user.password = password;
  user.passwordConfirm = passwordConfirm;

  // 5) save the changes
  await user.save();

  // 6) generate new jwtoken and send the response
  await createTokenSendResponse(user, 200, res);
});
