const mongoose = require('mongoose');

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

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
