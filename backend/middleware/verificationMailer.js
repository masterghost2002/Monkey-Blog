
let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: "host",
    service: "server",
    port: 587,
    secure: false, // use TLS
    auth: {
        user: "username@mail.com",
        pass: "password",
    },
});
const verifyMail = (otp, request, response) => {
    const { email, name } = request.body;
    let mailOptions = {
        from: "from",
        to: email,
        subject: "Verify your email",
        html: `
        <div>
        <span>Hi <strong>${name}! </strong></span><br></br>
        <span>Your verification code is <strong>${otp}</strong></span><br></br>
        <span> Enter this code &nbsp;to <strong>activate </strong>your Monkey-App account. </span><br></br>
        <span>If you have any questions, send us an email <strong>monkeyappsupport@cublearner.org.</strong></span><br></br>
        <span>  We’re glad you’re here! &nbsp;</span><br></br>
        <span> The <strong>Monkey-App team</strong></span>
        </div>
        `
    }
    transporter.sendMail(mailOptions, function (error, result) {
        if (error) {
            console.log("Failed to send verification mail", error);
            response.status(404).json({ message: "Unable to send otp", error: error });
        } else {
            console.log("Verification mail sent : " + result.response);
            return response.status(200).json({ message: `OTP Sent` });
        }
    });
};

module.exports = verifyMail;