const express = require('express');
const router = express.Router();
const {
    login,  
    updateUserTheme, 
    checkUser, 
    checkUser_not, 
    saveUser, 
    updatePassword
    } = require('../controllers/user-controller');
const {sendVerficationOtp, verifyUserOtp}  = require('../controllers/otpVerification');
const {verify_access_token}  = require('../middleware/auth_jwt');
router.post('/signup/sendotp', checkUser_not, sendVerficationOtp);
router.post('/signup/verifyuser', verifyUserOtp, saveUser);

// 
router.post('/verify_auth', verify_access_token, (req, res)=>{return res.status(200).json({ user: req.verified_user });});
router.post('/forgotpassword', checkUser, sendVerficationOtp);
router.post('/forgotpassword/verify', verifyUserOtp, updatePassword);

router.post('/login',  login);
router.put('/update',verify_access_token, updateUserTheme);
module.exports = router;