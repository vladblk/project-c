const express = require('express');
const destinationController = require('../controllers/destinationController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protectRoute, destinationController.getAllDestinations)
  .post(destinationController.addDestination);

router
  .route('/:id')
  .get(destinationController.getDestination)
  .patch(destinationController.updateDestination)
  .delete(
    authController.protectRoute,
    authController.restrictTo('admin'),
    destinationController.deleteDestination
  );

module.exports = router;
