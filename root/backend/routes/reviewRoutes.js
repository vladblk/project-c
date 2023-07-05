const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const reportController = require('../controllers/reportController');

const router = express.Router({ mergeParams: true }); // mergeParams: true -> review router has access to params from camp router

router
  .route('/reviews-report')
  .get(
    authController.protectRoute,
    authController.restrictTo('admin'),
    reportController.allReviewsReport
  );

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protectRoute,
    reviewController.addCampAndUserIDs,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.protectRoute,
    authController.restrictTo('admin', 'user'),
    reviewController.updateReview
  )
  .delete(
    authController.protectRoute,
    authController.restrictTo('admin', 'user'),
    reviewController.deleteReview
  );

module.exports = router;
