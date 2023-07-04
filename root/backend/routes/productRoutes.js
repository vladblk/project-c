const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    authController.protectRoute,
    authController.restrictTo('admin'),
    productController.addProduct
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    authController.protectRoute,
    authController.restrictTo('admin'),
    productController.updateProduct
  );

module.exports = router;
