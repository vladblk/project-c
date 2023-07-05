const mongoose = require('mongoose');
const Product = require('./productModel');
const catchAsync = require('../utils/catchAsync');

const productReviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
    },
    rating: {
      type: Number,
      required: ['true', 'A review must have a rating!'],
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'A review must belong to product!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to a user!'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// reviewSchema.index({ camp: 1, user: 1 }, { unique: true });

productReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });

  next();
});

productReviewSchema.statics.calcAverageRating = async function (product) {
  const stats = await this.aggregate([
    {
      $match: { product },
    },
    {
      $group: {
        _id: '$product',
        numOfRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  console.log(stats);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(product, {
      ratingsQuantity: stats[0].numOfRatings,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(product, {
      ratingsQuantity: 0,
      ratingsAverage: 0,
    });
  }
};

productReviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.product);
});

// post findOneAndUpdate and findOneAndDelete
productReviewSchema.post(
  /^findOneAnd/,
  catchAsync(async function (doc) {
    await doc.constructor.calcAverageRating(doc.product);
  })
);

const ProductReview = mongoose.model('ProductReview', productReviewSchema);

module.exports = ProductReview;
