const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A destination must have a name!'],
    unique: true,
    trim: true,
    maxlength: [40, 'A destination name must have a max of 40 characters!'],
    minlength: [10, 'A destination name must have a min of 10 characters!'],
    validate: {
      validator: function (nameValue) {
        return Boolean(nameValue.match(/^[A-Za-z ]*$/));
      },
      message: 'A destination name must contain only letters!',
    },
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
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
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration!'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size!'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty!'],
    enum: {
      values: ['easy', 'medium', 'hard'],
      message: 'A destination difficulty can be either easy, medium or hard!',
    },
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description!'],
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  startDates: {
    type: [Date],
  },
  country: {
    type: String,
    required: [true, 'A destination must have a country!'],
  },
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
