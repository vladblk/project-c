const express = require('express');
const authController = require('../controllers/authController');
const checkoutController = require('../controllers/checkoutController');

const router = express.Router();

router.post('/', authController.protectRoute, checkoutController.checkout);

module.exports = router;
