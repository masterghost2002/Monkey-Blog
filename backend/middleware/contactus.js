let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: process.env.NODE_MAILER_HOST,
    service: process.env.NODE_MAILER_SERVICE,
    port: process.env.NODE_MAILER_PORT,
    secure: false, // use TLS
    auth: {
        user: process.env.NODE_MAILER_USER_NAME,
        pass: process.env.NODE_MAILER_PASSWORD,
    },
});
const contactMail = (req, res, next) => {
    let mailOptions = {
        from: 'monkeyapp@mail.com',
        to: req.body.email,
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