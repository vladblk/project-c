const Product = require('../models/productModel');
const factoryFunction = require('./factoryFunction');

exports.getAllProducts = factoryFunction.getAll(Product, 'products');
exports.getProduct = factoryFunction.getOne(Product, 'product');
