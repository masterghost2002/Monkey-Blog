const express = require('express');
const router = express.Router();
const {signup,login, verify_access_token, updateUser} = require('../controllers/user-controller');

router.post('/verify_auth', verify_access_token);
router.post('/login',  login)
router.post('/signup', signup);
router.put('/update', updateUser)
// opt verification will be used later
// router.post('/signup/verify/:id', (req, res)=>{
//     console.log("Current session id");
//     console.log(req.session.id);
//     console.log("Params");
//     console.log(req.params.id);
//     if(req.session.id === req.params.id){
//         saveUser(req, res);
//     }
//     else
//     res.send("Session time out");
// })
module.exports = router;