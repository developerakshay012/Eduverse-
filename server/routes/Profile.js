
import express from 'express'
import { auth, isInstructor } from '../middleware/auth.js'
import { 
    deleteAccount, 
    getAllUserDetails, 
    getEnrolledCourses, 
    instructorDashboard, 
    updateDisplayPicture, 
    updateProfile } 
from '../controllers/Profile.js'

const proRouter = express.Router()


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
proRouter.delete("/deleteProfile",auth,deleteAccount)
proRouter.put("/updateProfile", auth, updateProfile)
proRouter.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
proRouter.get("/getEnrolledCourses", auth, getEnrolledCourses)
proRouter.put("/updateDisplayPicture", auth, updateDisplayPicture)
//get instructor dashboard details
proRouter.get("/getInstructorDashboardDetails",auth,isInstructor, instructorDashboard)

export default proRouter