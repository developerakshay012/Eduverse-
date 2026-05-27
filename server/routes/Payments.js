// Import the required modules
import express from 'express'
import { auth, isStudent } from '../middleware/auth.js'
import { capturePayment, sendPaymentSuccessEmail, verifySignature } from '../controllers/Payments.js'
const payRouter = express.Router()


payRouter.post("/capturePayment", auth, isStudent, capturePayment)

payRouter.post("/verifyPayment",auth,verifySignature)
payRouter.post("/sendPaymentSuccessEmail", auth, sendPaymentSuccessEmail)

export default payRouter