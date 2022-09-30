const express = require('express');
const router = express.Router();
const {getAllUser, signup, saveUser, login} = require('../controllers/user-controller');

router.get('/', getAllUser);
router.post('/login',  login)
router.post('/signup', signup);
router.post('/signup/verify/:id', (req, res)=>{
    console.log("Current session id");
    console.log(req.session.id);
    console.log("Params");
    console.log(req.params.id);
    if(req.session.id === req.params.id){
        saveUser(req, res);
    }
    else
    res.send("Session time out");
})
module.exports = router;