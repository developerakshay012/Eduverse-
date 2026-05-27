// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const User = require("../models/User");

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
//auth


export const auth = async (req, res, next) => {
  try {
    const token = 
      req.cookies?.token || 
      req.body?.token || 
      req.header("Authorization")?.replace("Bearer ", "");

    // 🔥 LOG 1: Check karo backend ko token mila ya nahi
    console.log("=== BACKEND RECEIVED TOKEN ===", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      // 🔥 LOG 2: Check karo JWT_SECRET sahi se load ho raha hai backend par
      console.log("=== BACKEND JWT_SECRET ===", process.env.JWT_SECRET);

      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (err) {
      // 🔥 LOG 3: Exact error print karo (Expired hai ya Invalid signature)
      console.error("=== JWT VERIFY ERROR ===", err.message);
      
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired",
      });
    }

    next();
  } catch (error) {
    console.error("=== MIDDLEWARE GLOBAL ERROR ===", error);
    return res.status(401).json({
      success: false,
      message: "Invalid token from middleware",
    });
  }
};
//isStudent
export const isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

//isInstructor
export const isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

//isAdmin
export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

// export const student = async(req , res , next) => {
//   try {
//     if(req.user.id !== 'Student'){
//       return res.status(401).json({
//         success:false,
//         message:"this role is for student"
//       })
//     }

//     next();
//   } catch (error) {
//     return res.status(500).json({
//       success:false,
//       message:"user can nor verified please try again"
//     })
//   }
// }