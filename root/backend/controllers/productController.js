const Product = require('../models/productModel');
const factoryFunction = require('./factoryFunction');

exports.getAllProducts = factoryFunction.getAll(Product, 'products');
exports.getProduct = factoryFunction.getOne(Product, 'product', {
  path: 'reviews',
});
exports.addProduct = factoryFunction.createOne(Product);
exports.updateProduct = factoryFunction.updateOne(Product, 'product');
exports.deleteProduct = factoryFunction.deleteOne(Product);
