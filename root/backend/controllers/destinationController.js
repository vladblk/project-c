const Destination = require('../models/destinationModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllDestinations = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getDestination = async (req, res) => {
  try {
    const { id } = req.params;

    const destination = await Destination.findById(id);

    res.status(200).json({
      status: 'success',
      data: { destination },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.addDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { destination },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const { id } = req.params;

    await Destination.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidatoers: true,
    });

    const updateDestination = await Destination.findById(id);

    res.status(200).json({
      status: 'success',
      data: { updateDestination },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    await Destination.findByIdAndRemove(id);

    res.status(203).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
