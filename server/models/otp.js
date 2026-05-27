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
    console.log(" Email sent:", response.messageId);
  } catch (error) {
    console.log(" Email sending failed:", error.message);
    // Important: error throw nahi kar rahe taki DB save fail na ho
  }
}

//  Pre-save hook (NO next, async only)
OTPSchema.pre("save", async function () {
  // Only for new document
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
});

//  Prevent OverwriteModelError


export default mongoose.model("OTP", OTPSchema);