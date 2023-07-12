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
    discount: {
      type: Number,
      validate: {
        validator: function (discountValue) {
          return discountValue < this.price;
        },
        message: 'The discount can not be lower than the regular price!',
      },
    },
    stock: {
      type: Number,
      required: [true, 'A product must have a quantity!'],
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
    caracteristic: {
      type: String,
      default: 'product',
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
