require("dotenv").config(); // โหลดตัวแปรจาก .env
const nodemailer = require("nodemailer");

async function testMail() {
  try {
    // สร้าง transporter สำหรับ Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // ส่งเมลจริง ๆ
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,       // ผู้ส่ง
      to: "destination@example.com",      // ผู้รับ (เปลี่ยนเป็นอีเมลที่จะทดสอบ)
      subject: "Test nodemailer",
      text: "Hello from nodemailer test."
    });

    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending mail:", err);
  }
}

testMail();
