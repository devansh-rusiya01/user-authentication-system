import crypto from "crypto";

import User from "../models/User.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";


dotenv.config();

// Step 1: Send Password Reset Email
export const sendResetEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log("Reset Password Token:", resetToken); 

    // Hash token before saving
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
   

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:5000/api/auth/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset email sent!" });

  } catch (error) {
    console.error("Error sending email:", error); // ✅ Debugging line
    res.status(500).json({ message: "Error sending email", error });
  }


};

// Step 2: Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Hash the received token and compare with the stored token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Token should not be expired
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: "Password reset successful!" });

  } catch (error) {
    console.error("Error resetting password:", error); // ✅ Debugging line
    res.status(500).json({ message: "Error resetting password", error });
  }
};
