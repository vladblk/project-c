const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A destination must have a name!'],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  discount: {
    type: Number,
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
