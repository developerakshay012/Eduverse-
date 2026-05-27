import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

// 🔥 Yeh log lagakar check karo ki keys initialize ho bhi rahi hain ya nahi
console.log("=== CHECKING RAZORPAY INSTANCE KEYS ===");
console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Secret length:", process.env.RAZORPAY_SECRET ? process.env.RAZORPAY_SECRET.length : "MISSING");

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});