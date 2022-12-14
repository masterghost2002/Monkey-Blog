
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
const verifyMail = (request, response) => {
    const  email = request.body.email;
    const name = request.name?request.name:request.body.name;
    const type = request.type;
    const otp = request.OTP;
    const content = type === "forgot_password"?
                                "Enter this code &nbsp;to <strong>reset </strong>your Monkey-App password.":
                                "Enter this code &nbsp;to <strong>activate </strong>your Monkey-App account. ";
    const subject = type === "forgot_password"?
                                "Password Reset OTP":
                                "Verify your email";
    let mailOptions = {
        from: process.env.NODE_MAILER_USER_NAME,
        to: email,
        subject: subject,
        html: `
        <div>
        <span>Hi <strong>${name}! </strong></span><br></br>
        <span>Your verification code is <strong>${otp}</strong></span><br></br>
        <span>${content} </span><br></br>
        <span>OTP is valid for 10 minutes</span><br></br>
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