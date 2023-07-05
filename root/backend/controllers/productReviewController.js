const ProductReview = require('../models/productReviewModel');
//const catchAsync = require('../utils/catchAsync');
const factoryFunction = require('./factoryFunction');

exports.addProductAndUserIDs = (req, res, next) => {
  // if there is no camp id specified in posted body, get the camp id from req.params
  if (!req.body.product) req.body.product = req.params.productID;
  // if there is no user id specified in posted body, get the user id from currentUser (defined in protect route middleware)
  if (!req.body.user) req.body.user = req.currentUser._id;

  next();
};

exports.getProductReview = factoryFunction.getOne(
  ProductReview,
  'productReview'
);

exports.getAllProductReviews = factoryFunction.getAll(
  ProductReview,
  'productReviews'
);

exports.createProductReview = factoryFunction.createOne(
  ProductReview,
  'productReview'
);

exports.updateProductReview = factoryFunction.updateOne(
  ProductReview,
  'productReview'
);

exports.deleteProductReview = factoryFunction.deleteOne(
  ProductReview,
  'productReview'
);
