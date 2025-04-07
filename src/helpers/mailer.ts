import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { connectDB } from "@/dbConfig/dbConfig";
connectDB();


export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "reset-password") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: "TEST@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${emailType === "VERIFY" ? "Email Verification" : "Password Reset"}</title>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                padding: 20px 0;
                background-color: ${emailType === "VERIFY" ? "#4F46E5" : "#DC2626"};
                color: white;
                border-radius: 8px 8px 0 0;
              }
              .content {
                padding: 30px 20px;
              }
              .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: ${emailType === "VERIFY" ? "#4F46E5" : "#DC2626"};
                color: white;
                text-decoration: none;
                border-radius: 6px;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #666;
                font-size: 14px;
                border-top: 1px solid #eee;
              }
              .logo {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
              }
              .warning-box {
                background-color: #FEF2F2;
                border-left: 4px solid #DC2626;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .warning-text {
                color: #DC2626;
                font-weight: 500;
                margin: 0;
              }
              .steps {
                margin: 20px 0;
                padding-left: 20px;
              }
              .steps li {
                margin-bottom: 10px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">Your App Name</div>
                <h1>${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</h1>
              </div>
              
              <div class="content">
                <p>Hello,</p>
                
                ${emailType === "VERIFY" 
                  ? `<p>Thank you for signing up! Please verify your email address to complete your registration.</p>
                     <div style="text-align: center;">
                       <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" class="button">
                         Verify Email
                       </a>
                     </div>`
                  : `<p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
                     
                     <div class="warning-box">
                       <p class="warning-text">⚠️ For security reasons, this link will expire in 1 hour.</p>
                     </div>

                     <div style="text-align: center;">
                       <a href="${process.env.DOMAIN}/forgot-password?token=${hashedToken}" class="button">
                         Reset Password
                       </a>
                     </div>

                     <p>To reset your password, follow these steps:</p>
                     <ol class="steps">
                       <li>Click the "Reset Password" button above</li>
                       <li>Enter your new password</li>
                       <li>Confirm your new password</li>
                       <li>Click "Update Password"</li>
                     </ol>`
                }

                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #666; font-size: 14px;">
                  ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "forgot-password"}?token=${hashedToken}
                </p>

                <p>This link will expire in 1 hour.</p>
                
                <p>If you didn't request this, please ignore this email.</p>
              </div>

              <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
                <p>&copy; ${new Date().getFullYear()} Your App Name. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
