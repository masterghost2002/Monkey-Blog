const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generate_access_token, verify_token } = require('../middleware/auth_jwt');
const findUser = async (req, res) =>{
    const {email} = req.body;
    let user;
    try{
        user = await User.findOne({email:email});
    }
    catch{
        return res.status(500).json({message: "Server Error"});
    }
    return user;
}
const checkUser_not = async (req,res, next)=>{
    const {password} = req.body;
    if (password.length < 8) return res.status(400).json({ message: "Must be of 8 character" });
    const user = await findUser(req, res);
    if(user) return res.status(404).json({ message: "User Already Exist"});
    req.type = "new_user_registeration";
    next();
}
const checkUser = async (req, res, next)=>{
    const {password} = req.body;
    if (password.length < 8) return res.status(400).json({ message: "Must be of 8 character" });
    const user = await findUser(req, res);
    if(!user) return res.status(404).json({ message: "User Not Found"});
    req.name = user.name;
    req.type = "forgot_password";
    next();
}
const saveUser = async (req, res) => {
    const newUser = new User({
        name: req.userInfo.name,
        email: req.userInfo.email,
        password: req.userInfo.password,
        blogs: []
    });
    try {
        newUser.save();
    }
    catch (err) {
        return res.status(500).json({message: "Server Error"});
    }
    return res.status(200).json({ message: `Register Success`});
};

const login = async (req, res) => {
    const existingUser = await findUser(req, res);
    const {password } = req.body;
    if(!existingUser) return res.status(404).json({ message: "User not found" });
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password); // return boolean
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password" });
    }
    const user = { name: existingUser.name, _id: existingUser._id, themeSide: existingUser.themeSide };
    const accessToken = generate_access_token(user);
    const userInfo = {_id:existingUser._id, name:existingUser.name, themeSide:existingUser.themeSide};
    return res.status(200).json({ accessToken: accessToken, user: userInfo });
}

const verify_access_token = (req, res) => {
    const authHeader = req.headers['authorization'];
    const ACCESS_TOKEN = authHeader.split(" ")[1];
    if (ACCESS_TOKEN === null) res.status(401);
    const user = verify_token(ACCESS_TOKEN);
    if (user === null) {
        return res.status(404).json({ message: "Auth failed" });
    };
    return res.status(200).json({ user: user });
}

const updateUser = async (req, res) => {
    const {userId, themeSide} = req.body;
    let user;
    try {
        user = await User.findByIdAndUpdate(userId, {
            themeSide: themeSide
        });
    } catch (err) {
        return res.status(500).json({message:"Server Error"});
    }
    if (!user)
        return res.status(500).json({ message: "Unable To update User" });
    const accessToken_payload = { name: user.name, _id: user._id, themeSide: themeSide };
    const accessToken = generate_access_token(accessToken_payload);
    return res.status(200).json({ message: "User Update Success", accessToken:accessToken });

}
const updatePassword = async (req, res)=>{
    const password = req.userInfo.password;
    const email = req.userInfo.email;
    let user;
    try{
        user = await User.findOneAndUpdate({email:email}, {
            password: password
        });
    }
    catch{
        return res.status(500).json({message: "Server Error"});
    }
    if(!user) return res.status(404).json({message:"User not found"});
    return res.status(200).json({message:"Password Update success"});

}
module.exports = {saveUser, login, verify_access_token, updateUser,checkUser, checkUser_not, updatePassword };