const express = require('express');
const router = express.Router();
const {login, verify_access_token, updateUser, checkUser, checkUser_not, saveUser, updatePassword} = require('../controllers/user-controller');
const {sendVerficationOtp, verifyUserOtp}  = require('../controllers/otpVerification');
router.post('/signup/sendotp', checkUser_not, sendVerficationOtp);
router.post('/signup/verifyuser', verifyUserOtp, saveUser);

// 
router.post('/verify_auth', verify_access_token);
router.post('/forgotpassword', checkUser, sendVerficationOtp);
router.post('/forgotpassword/verify', verifyUserOtp, updatePassword);

router.post('/login',  login);
router.put('/update', updateUser);
module.exports = router;