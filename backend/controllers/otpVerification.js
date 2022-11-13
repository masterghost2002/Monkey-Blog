const userOptVerfication = require('../models/OptModel');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const verificationMailer  = require('../middleware/verificationMailer');
const sendVerficationOtp = async (request, response)=>{
    const {email, password} = request.body;
    const name = request.name?request.name:request.body.name;
    let verification_modal;
    try{
        verification_modal = await userOptVerfication.findOne({email:email});
    }
    catch(error){
        return response.status(500).json({message: "Server Error"});
    }
    if(verification_modal)
        await userOptVerfication.deleteOne({email: email});
    const Otp = `${Math.floor(1000+Math.random()*9000)}`;
    const newVerficaion = new userOptVerfication({
        Otp: bcrypt.hashSync(Otp),
        name: name,
        email: email,
        password: bcrypt.hashSync(password),
        createdAt: Date.now()
    });

    request.OTP = Otp;
    try{
        await newVerficaion.save();
    }
    catch(error){
        return response.status(404).json({message:"Unable to send otp", error:error});
    }
    verificationMailer(request, response);;
};
const verifyUserOtp = async(request, response, next)=>{
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
    request.userInfo = existingVerification;
    next();
}
module.exports = {sendVerficationOtp, verifyUserOtp};
