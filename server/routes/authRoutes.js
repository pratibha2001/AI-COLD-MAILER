const express= require('express');
const Router= express.Router();
const authController= require('./controllers/authController.js');

//register new user
router.post('/register',authController.register);

//login a user
router.post('/login',authController.login);

//verify otp
router.post('/verify-otp',authController.verifyOTP);

module.exports = router;