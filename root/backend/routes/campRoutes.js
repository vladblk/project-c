const express = require('express');
const campController = require('../controllers/campController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// nested route with reviewRouter
router.use('/:campID/reviews', reviewRouter);

router
  .route('/')
  .get(authController.protectRoute, campController.getAllCamps)
  .post(campController.addCamp);

router
  .route('/:id')
  .get(campController.getCamp)
  .patch(campController.updateCamp)
  .delete(
    authController.protectRoute,
    authController.restrictTo('admin'),
    campController.deleteCamp
  );

//router
//.route('/:campID/reviews')
//.post(authController.protectRoute, reviewController.addReview);

module.exports = router;
