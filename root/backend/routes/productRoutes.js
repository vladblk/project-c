const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const reportController = require('../controllers/reportController');

const router = express.Router();

router
  .route('/products-report')
  .get(
    authController.protectRoute,
    authController.restrictTo('admin'),
    reportController.allProductsReport
  );

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
