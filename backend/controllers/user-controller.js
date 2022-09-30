const User = require('../models/User');
const bcrypt = require('bcryptjs');
const verifyMail = require('../middleware/verificationMailer');
const getAllUser = async(req, res, next)=>{
    let users;
    try{
        users = await User.find();
    } catch(err){
       return console.log("Fetching user faild: "+err);
    }
    if(!users)
        return res.status(404).json({message: "No user found"});
    return res.status(200).json({users});
};

const signup = async (req, res, next)=>{
    const {name, email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email:email});
    }catch(err){
        console.log("Error while Signup: "+err);
    }
    if(existingUser)
        return res.status(400).json({message: "User Already Exist"});
    try{
        saveUser(req, res, next);
        // verifyMail(req, res, next);
    }catch(err){
        return console.log("Unable to register User: "+err);
    };
};
const saveUser = async (req, res)=>{
    // console.log(req.session.name);
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        blogs: []
    });
    // console.log(newUser);
    try{
        newUser.save();
    }
    catch(err){
        return console.log("Unable to register User: "+err);
    }
    return res.status(200).json({message:`Dear ${req.body.name} welcome to monkey app`, data:newUser});
};

const login = async (req, res, next)=>{
    const {email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email:email});
    }catch(err){
        return console.log("User Not Found: "+err);
    }
    if(!existingUser){
        return res.status(404).json({message: "No user found"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password); // return boolean
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect password"});
    }
    return res.status(200).json({message: "Login Success", user:existingUser});

}
module.exports = {getAllUser, signup, saveUser, login};