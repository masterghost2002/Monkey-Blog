let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "<Email>",
        pass: "<Token>"
    }
});
const contactMail = (req, res, next) => {
    let mailOptions = {
        from: req.body.email,
        to: "rakeshdhariwal657@gmail.com",
        subject: req.body.subject,
        text: `Hi I ${req.body.name}  ${req.body.message}`
    }
    transporter.sendMail(mailOptions, function (error, result) {
        if (error) {
            res.status(404).send("Failed to send  mail" + error);
        } else {
            console.log("Contact mail sent : " + result.response);
            res.status(200).send("Contact mail sent : " + result.response);
        }
    });
};

module.exports = contactMail;