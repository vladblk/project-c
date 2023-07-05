const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const reportController = require('../controllers/reportController');
const productReviewRouter = require('./productReviewRoutes');

const router = express.Router();

// nested route with productReviewRouter
router.use('/:productID/reviews', productReviewRouter);

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
  )
  .delete(
    authController.protectRoute,
    authController.restrictTo('admin'),
    productController.deleteProduct
  );

module.exports = router;
