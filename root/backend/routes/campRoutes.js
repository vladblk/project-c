const express = require('express');
const campController = require('../controllers/campController');
const authController = require('../controllers/authController');
const reportController = require('../controllers/reportController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// nested route with reviewRouter
router.use('/:campID/reviews', reviewRouter);

router
  .route('/camps-report')
  .get(
    authController.protectRoute,
    authController.restrictTo('admin'),
    reportController.allCampsReport
  );

router
  .route('/')
  .get(campController.getAllCamps)
  .post(
    authController.protectRoute,
    authController.restrictTo('admin'),
    campController.createCamp
  );

router
  .route('/:id')
  .get(campController.getCamp)
  .patch(
    authController.protectRoute,
    authController.restrictTo('admin'),
    campController.updateCamp
  )
  .delete(
    authController.protectRoute,
    authController.restrictTo('admin'),
    campController.deleteCamp
  );

module.exports = router;
