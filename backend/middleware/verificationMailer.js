
let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "<Email>",
        pass: "<Token>"
    }
});
const verifyMail = (req, res, next) => {
    // console.log(req.body);
    req.session.name = req.body.name;
    req.session.email = req.body.email;
    req.session.password = req.body.password;
    let mailOptions = {
        from: "monkeyapp@verifymail.com",
        to: req.body.email,
        subject: "Verify Email Address",
        text: `Please verify your email address. [GET] http://localhost:3000/verify/${req.session.id}`
    }
    transporter.sendMail(mailOptions, function (error, result) {
        if (error) {
            console.log("Failed to send verification mail");
            res.status(404).send("Failed to send verification mail" + error);
        } else {
            console.log("Verification mail sent : " + result.response);
            res.status(200).send("Verification mail sent : " + result.response);
        }
    });
};

module.exports = verifyMail;