const express = require('express');
const productReviewController = require('../controllers/productReviewController');
const authController = require('../controllers/authController');
// const productReportController = require('../controllers/productReportController');

const router = express.Router({ mergeParams: true }); // mergeParams: true -> review router has access to params from product router

// router
//   .route('/product-reviews-report')
//   .get(
//     authController.protectRoute,
//     authController.restrictTo('admin'),
//     productReportController.allProductReviewsReport
//   );

router
  .route('/')
  .get(productReviewController.getAllProductReviews)
  .post(
    authController.protectRoute,
    productReviewController.addProductAndUserIDs,
    productReviewController.createProductReview
  );

router
  .route('/:id')
  .get(productReviewController.getProductReview)
  .patch(
    authController.protectRoute,
    authController.restrictTo('admin', 'user'),
    productReviewController.updateProductReview
  )
  .delete(
    authController.protectRoute,
    authController.restrictTo('admin', 'user'),
    productReviewController.deleteProductReview
  );

module.exports = router;
