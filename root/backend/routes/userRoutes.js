const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// initiate router
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/changeMyPassword',
  authController.protectRoute,
  authController.changePassword
);

router.patch('/updateMe', authController.protectRoute, userController.updateMe);
router.delete(
  '/deleteMe',
  authController.protectRoute,
  userController.deleteMe
);

router.route('/').get(userController.getAllUsers);

module.exports = router;
