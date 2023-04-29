const Destination = require('../models/destinationModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//const catchAsync = (fn) => {
//return (req, res, next) => {
//fn(req, res, next).catch((error) => next(error));
//};
//};

exports.getAllDestinations = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Destination, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // executing query
  const destinations = await features.query;

  // sending response
  res.status(200).json({
    status: 'success',
    results: destinations.length,
    data: { destinations },
  });
});

exports.getDestination = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const destination = await Destination.findById(id);

  if (!destination) {
    const message = `No destination found with id: ${id}`;
    const statusCode = 404;
    const error = new AppError(message, statusCode);

    next(error);
    return;
  }

  res.status(200).json({
    status: 'success',
    data: { destination },
  });
});

exports.addDestination = catchAsync(async (req, res, next) => {
  const destination = await Destination.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { destination },
  });
});

exports.updateDestination = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const destination = await Destination.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidatoers: true,
  });

  if (!destination) {
    const message = `No destination found with id: ${id}`;
    const statusCode = 404;
    const error = new AppError(message, statusCode);

    next(error);
    return;
  }

  const updateDestination = await Destination.findById(id);

  res.status(200).json({
    status: 'success',
    data: { updateDestination },
  });
});

exports.deleteDestination = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const destination = await Destination.findByIdAndRemove(id);

  if (!destination) {
    const message = `No destination found with id: ${id}`;
    const statusCode = 404;
    const error = new AppError(message, statusCode);

    next(error);
    return;
  }

  res.status(203).json({
    status: 'success',
  });
});
