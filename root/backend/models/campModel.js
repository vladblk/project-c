const mongoose = require('mongoose');

const campSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A camp must have a name!'],
      unique: true,
      trim: true,
      maxlength: [40, 'A camp name must have a max of 40 characters!'],
      minlength: [10, 'A camp name must have a min of 10 characters!'],
      validate: {
        validator: function (nameValue) {
          return Boolean(nameValue.match(/^[A-Za-z ]*$/));
        },
        message: 'A camp name must contain only letters!',
      },
    },
    price: {
      type: Number,
      required: [true, 'A camp must have a price'],
    },
    discount: {
      type: Number,
      validate: {
        validator: function (discountValue) {
          return discountValue < this.price;
        },
        message: 'The discount can  not be lower than the regular price!',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
      set: (value) => value.toFixed(1),
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      required: [true, 'A camp must have a duration!'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A camp must have a group size!'],
    },
    difficulty: {
      type: String,
      required: [true, 'A camp must have a difficulty!'],
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'A camp difficulty can be either easy, medium or hard!',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A camp must have a description!'],
    },
    description: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
    country: {
      type: String,
      required: [true, 'A camp must have a country!'],
    },
    location: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

campSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'camp',
  localField: '_id',
});

const Camp = mongoose.model('Camp', campSchema);

module.exports = Camp;
