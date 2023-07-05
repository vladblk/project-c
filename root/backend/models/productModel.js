const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name!'],
    },
    description: {
      type: String,
      required: [true, 'A product must have a description!'],
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price!'],
    },
    quantity: {
      type: Number,
      required: [true, 'A product must have a quantity!'],
    },

    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual('reviews', {
  ref: 'ProductReview',
  foreignField: 'product',
  localField: '_id',
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
