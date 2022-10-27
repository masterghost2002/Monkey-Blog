const express = require('express');
const router = express.Router();
const {login, verify_access_token, updateUser} = require('../controllers/user-controller');
const {sendVerficationOtp, verifyUserOtp}  = require('../controllers/otpVerification');
router.post('/signup/sendotp', sendVerficationOtp);
router.post('/signup/verifyuser', verifyUserOtp);
router.post('/verify_auth', verify_access_token);
router.post('/login',  login)
router.put('/update', updateUser)
module.exports = router;