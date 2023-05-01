const Camp = require('../models/campModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//const catchAsync = (fn) => {
//return (req, res, next) => {
//fn(req, res, next).catch((error) => next(error));
//};
//};

exports.getAllCamps = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Camp, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // executing query
  const camps = await features.query;

  // sending response
  res.status(200).json({
    status: 'success',
    results: camps.length,
    data: { camps },
  });
});

exports.getCamp = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const camp = await Camp.findById(id);

  if (!camp) {
    const message = `No camp found with id: ${id}`;
    const statusCode = 404;
    const error = new AppError(message, statusCode);

    next(error);
    return;
  }

  res.status(200).json({
    status: 'success',
    data: { camp },
  });
});

exports.addCamp = catchAsync(async (req, res, next) => {
  const camp = await Camp.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { camp },
  });
});

exports.updateCamp = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const camp = await Camp.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidatoers: true,
  });

  if (!camp) {
    const message = `No camp found with id: ${id}`;
    const statusCode = 404;
    const error = new AppError(message, statusCode);

    next(error);
    return;
  }

  const updatecamp = await Camp.findById(id);

  res.status(200).json({
    status: 'success',
    data: { updatecamp },
  });
});

exports.deleteCamp = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const camp = await Camp.findByIdAndRemove(id);

  if (!camp) {
    const message = `No camp found with id: ${id}`;
    const statusCode = 404;
    const error = new AppError(message, statusCode);

    next(error);
    return;
  }

  res.status(203).json({
    status: 'success',
  });
});
