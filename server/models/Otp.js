import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";
import emailTemplate from "../template/emailTemplate.js";

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // 5 min expiry
  },
});

// Email sending function
async function sendVerificationEmail(email, otp) {
  try {
    const response = await mailSender(
      email,
      "Verification Email",
      emailTemplate(otp)
    );
    console.log("📩 Email sent:", response?.messageId || "Success");
  } catch (error) {
    console.log("❌ Email sending failed:", error.message);
  }
}

// Pre-save hook
OTPSchema.pre("save", async function () {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
});

//  Model export with check to prevent OverwriteModelError
export default mongoose.models.OTP || mongoose.model("OTP", OTPSchema);