const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// initiate router
const router = express.Router();

router.use(authController.isLoggedIn);

//
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/signout', authController.signout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//
router.get(
  '/me',
  authController.protectRoute,
  userController.getMe,
  userController.getUser
);
router.patch('/updateMe', authController.protectRoute, userController.updateMe);
router.delete(
  '/deleteMe',
  authController.protectRoute,
  userController.deleteMe
);
router.patch(
  '/changeMyPassword',
  authController.protectRoute,
  authController.changePassword
);

//
router
  .route('/')
  .get(
    authController.protectRoute,
    authController.restrictTo('admin'),
    userController.getAllUsers
  );
router
  .route('/:id')
  .get(
    authController.protectRoute,
    authController.restrictTo('admin'),
    userController.getUser
  );

module.exports = router;
