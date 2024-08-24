const nodemailer = require('nodemailer');
require('dotenv').config();

const SignupMail = async (code, email) => {
    try {
        // Create a transporter object using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS, // App password if using Gmail with two-factor authentication
            },
        });

        // Attractive HTML email template
        const htmlContent = `
        <!DOCTYPE html>
        <html>
    <body>
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2;">
    <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">AISECT UNIVERSITY</a>
    </div>
    <h6 style="font-size:1.4em">Hi,</h6>
    <p  style="font-size:1.3em">Thank you for choosing AISECT University app. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
    <p style="font-size:0.9em;">Regards,<br />AISECT UNIVERSITY</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300;">
        <p>AISECT UNIVERSITY</p>
        <p>Hazaribagh, Jharkhand</p>
        <p>SUSHANT(Daksh)</p>
    </div>
    </div>
</div>
    </body> 
    </html>
        `;

        // Email details
        const mail = {
            from: `"Aisect UniverSity" <${process.env.EMAIL}>`, // Professional sender name and email
            to: email, // Recipient email from request
            subject: "Your Verification Code", // Subject line
            text: `Your verification code is: ${code}`, // Plain text body for non-HTML email clients
            html: htmlContent, // Attractive HTML body with the verification code
        };

        // Send email
        const info = await transporter.sendMail(mail);

        console.log("Verification email sent: %s", info.messageId);

        return {
            status: true,
            message: "Verification code sent to email.",
            info: info,
        };

    } catch (e) {
        console.error(e);
        return {
            status: false,
            message: "Failed to send verification code.",
            error: e.message,
        };
    }
};

module.exports = SignupMail;
