const nodemailer = require("nodemailer");
require("dotenv").config();

(async () => {
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "your-personal-email@example.com",
      subject: "Test Email",
      text: "If you see this, your nodemailer credentials work!"
    });

    console.log("Email sent:", info);
  } catch (err) {
    console.error("Test email error:", err);
  }
})();
