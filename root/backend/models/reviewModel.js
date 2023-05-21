const mongoose = require('mongoose');
const Camp = require('./campModel');
const catchAsync = require('../utils/catchAsync');

const reviewSchema = new mongoose.Schema(
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
    camp: {
      type: mongoose.Schema.ObjectId,
      ref: 'Camp',
      required: [true, 'A review must belong to camp!'],
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

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });

  next();
});

reviewSchema.statics.calcAverageRating = async function (camp) {
  const stats = await this.aggregate([
    {
      $match: { camp },
    },
    {
      $group: {
        _id: '$camp',
        numOfRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  console.log(stats);

  if (stats.length > 0) {
    await Camp.findByIdAndUpdate(camp, {
      ratingsQuantity: stats[0].numOfRatings,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Camp.findByIdAndUpdate(camp, {
      ratingsQuantity: 0,
      ratingsAverage: 0,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.camp);
});

// post findOneAndUpdate and findOneAndDelete
reviewSchema.post(
  /^findOneAnd/,
  catchAsync(async function (doc) {
    await doc.constructor.calcAverageRating(doc.camp);
  })
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
