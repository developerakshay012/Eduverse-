// Import the required modules
import express from 'express'
import { changePassword, login, sendotp, signup } from '../controllers/Auth.js'
import { auth } from '../middleware/auth.js'
import { resetPassword, resetPasswordToken } from '../controllers/ResetPassword.js'

const authRouter = express.Router()

// Import the required controllers and middleware functions


// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
authRouter.post("/login", login)

// Route for user signup
authRouter.post("/signup", signup)

// Route for sending OTP to the user's email
authRouter.post("/sendotp", sendotp)

// Route for Changing the password
authRouter.post("/changepassword", auth,changePassword)
// authRouter.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
authRouter.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
authRouter.post("/reset-password", resetPassword)

// Export the router for use in the main application
export default authRouter