const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getOne = (Model, docName, populateOption) => {
  return catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);

    if (populateOption) {
      query = query.populate(populateOption);
    }

    const doc = await query;

    if (!doc) {
      const message = `No ${docName} found with id: ${id}`;
      const statusCode = 404;
      const error = new AppError(message, statusCode);

      next(error);
      return;
    }

    res.status(200).json({
      status: 'success',
      data: { [docName]: doc },
    });
  });
};

exports.getAll = (Model, docName) => {
  return catchAsync(async (req, res, next) => {
    // used for get all reviews based on camp id
    const { campID } = req.params;
    let filter = {};
    if (campID) filter = { camp: campID };
    // =========================================

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // executing query
    const doc = await features.query;

    // sending response
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: { [docName]: doc },
    });
  });
};

exports.createOne = (Model, docName) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { [docName]: doc },
    });
  });
};

exports.deleteOne = (Model, docName) => {
  return catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const doc = await Model.findByIdAndRemove(id);

    if (!doc) {
      const message = `No ${docName} found with id: ${id}`;
      const statusCode = 404;
      const error = new AppError(message, statusCode);

      next(error);
      return;
    }

    res.status(203).json({
      status: 'success',
    });
  });
};

exports.updateOne = (Model, docName) => {
  return catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidatoers: true,
    });

    if (!doc) {
      const message = `No ${docName} found with id: ${id}`;
      const statusCode = 404;
      const error = new AppError(message, statusCode);

      next(error);
      return;
    }

    const updatedDoc = await Model.findById(id);

    res.status(200).json({
      status: 'success',
      data: { [docName]: updatedDoc },
    });
  });
};
