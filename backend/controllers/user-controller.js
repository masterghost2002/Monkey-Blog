const User = require('../models/User');
const bcrypt = require('bcryptjs');
// const verifyMail = require('../middleware/verificationMailer');
const { generate_access_token, verify_token } = require('../middleware/auth_jwt');


const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (password.length < 8) return res.status(400).json({ message: "Must be of 8 character" })
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.log("Error while Signup: " + err);
    }
    if (existingUser)
        return res.status(404).json({ message: "User Already Exist" });
    try {
        saveUser(req, res, next);
    } catch (err) {
        return console.log("Unable to register User: " + err);
    };
};
const saveUser = async (req, res) => {
    // console.log(req.session.name);
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        blogs: []
    });
    // console.log(newUser);
    try {
        newUser.save();
    }
    catch (err) {
        return console.log("Unable to register User: " + err);
    }
    return res.status(200).json({ message: `Dear ${req.body.name} welcome to monkey app`, user: newUser });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        return console.log("User Not Found: " + err);
    }
    if (!existingUser) {
        return res.status(404).json({ message: "Email is not registered" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password); // return boolean
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password" });
    }
    const user = { name: existingUser.name, _id: existingUser._id, themeSide: existingUser.themeSide };
    const accessToken = generate_access_token(user);
    return res.status(200).json({ accessToken: accessToken, user: existingUser });

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
        return console.log(err);
    }
    if (!user)
        return res.status(500).json({ message: "Unable To update User" });
    const accessToken_payload = { name: user.name, _id: user._id, themeSide: themeSide };
    const accessToken = generate_access_token(accessToken_payload);
    return res.status(200).json({ message: "User Update Success", accessToken:accessToken });

}
module.exports = { signup, saveUser, login, verify_access_token, updateUser };