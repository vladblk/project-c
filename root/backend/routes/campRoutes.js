const express = require('express');
const campController = require('../controllers/campController');
const authController = require('../controllers/authController');

const router = express.Router();

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

module.exports = router;
