const Review = require('../models/reviewModel');
//const catchAsync = require('../utils/catchAsync');
const factoryFunction = require('./factoryFunction');

exports.addCampAndUserIDs = (req, res, next) => {
  // if there is no camp id specified in posted body, get the camp id from req.params
  if (!req.body.camp) req.body.camp = req.params.campID;
  // if there is no user id specified in posted body, get the user id from currentUser (defined in protect route middleware)
  if (!req.body.user) req.body.user = req.currentUser._id;

  next();
};

exports.getReview = factoryFunction.getOne(Review, 'review');

exports.getAllReviews = factoryFunction.getAll(Review, 'reviews');

exports.createReview = factoryFunction.createOne(Review, 'review');

exports.updateReview = factoryFunction.updateOne(Review, 'review');

exports.deleteReview = factoryFunction.deleteOne(Review, 'review');
