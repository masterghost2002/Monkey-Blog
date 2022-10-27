const userOptVerfication = require('../models/OptModel');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const verificationMailer  = require('../middleware/verificationMailer');
const {saveUser} = require('./user-controller');
const sendVerficationOtp = async (request, response)=>{
    const {name, email, password} = request.body;
    if (password.length < 8) return response.status(400).json({ message: "Must be of 8 character" })
    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    }
    catch(error){
        response.send(error);
    }
    if(existingUser){
        return response.status(404).json({ message: "User Already Exist" });
    }
    let existingVerification;
    try{
        existingVerification = await userOptVerfication.findOne({email:email});
    }
    catch(error){
        return response.status(500).json({message: "Server Error"});
    }
    if(existingVerification)
        await userOptVerfication.deleteOne({email: email});
    const Otp = `${Math.floor(1000+Math.random()*9000)}`;
    const newVerficaion = new userOptVerfication({
        Otp: bcrypt.hashSync(Otp),
        name: name,
        email: email,
        password: bcrypt.hashSync(password),
        createdAt: Date.now()
    });
    try{
        newVerficaion.save();
        verificationMailer(Otp,request, response);
    }
    catch(error){
        return response.status(404).json({message:"Unable to send otp", error:error});
    }
    // return response.status(200).json({message: `OTP Sent Success`});
};
const verifyUserOtp = async(request, response)=>{
    const {Otp, email} = request.body;
    let existingVerification;
    try{
        existingVerification = await userOptVerfication.findOne({email:email});
    }
    catch(error){
       return response.status(404).json({message: "Server Error"});
    }
    if(!existingVerification)
       return response.status(404).json({message: "OTP expired or not send yet try again"});
    const OTP_VERFIED_STATUS = bcrypt.compareSync(Otp, existingVerification.Otp);
    if(!OTP_VERFIED_STATUS)
        return response.status(400).json({message: "Invalid OTP"});
    await userOptVerfication.deleteOne({email: email});
    saveUser(existingVerification.name, existingVerification.email, existingVerification.password, request, response);

}
module.exports = {sendVerficationOtp, verifyUserOtp};
