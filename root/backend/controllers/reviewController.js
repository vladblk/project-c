const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const { campID } = req.params;
  let filter = {};
  if (campID) filter = { camp: campID };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    data: { reviews },
  });
});

exports.addReview = catchAsync(async (req, res, next) => {
  // if there is no camp id specified in posted body, get the camp id from req.params
  if (!req.body.camp) req.body.camp = req.params.campID;
  // if there is no user id specified in posted body, get the user id from currentUser (defined in protect route middleware)
  if (!req.body.user) req.body.user = req.currentUser._id;

  const newReview = await Review.create(req.body);

  res.status(200).json({
    status: 'success',
    data: { review: newReview },
  });
});
