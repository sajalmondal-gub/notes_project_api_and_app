import nodemailer from "nodemailer";
import config from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

export const sendResetMail = async (email, resetUrl) => {
  const mailOptions = {
    from: `"Note API Support" <no-reply@noteapp.com>`,
    to: email,
    subject: "🔐 Reset Your Password - Action Required",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>We received a request to reset your password for your Note account. Click the button below to set a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;" target="_blank">Reset Password</a>
        </div>
        <p style="color: #666; font-size: 12px;">This link is strictly valid for <strong>10 minutes</strong>. If you did not request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="color: #999; font-size: 12px;">If the button doesn't work, copy and paste this URL into your browser:</p>
        <p style="color: #0066cc; font-size: 12px; word-break: break-all;">${resetUrl}</p>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};
