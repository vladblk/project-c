const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true }); // mergeParams: true -> review router has access to params from camp router

router
  .route('/')
  .get(authController.protectRoute, reviewController.getAllReviews)
  .post(authController.protectRoute, reviewController.addReview);

module.exports = router;
