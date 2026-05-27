// Import the required modules

import express from 'express'
import { auth, isAdmin, isInstructor, isStudent } from '../middleware/auth.js'
import { createCourse, deleteCourse, editCourse, getAllCourses, getCourseDetails, 
    getFullCourseDetails, getInstructorCourses, markLectureAsComplete, searchCourse } from '../controllers/Course.js'
import { createSection, deleteSection, updateSection } from '../controllers/Section.js'
import { createSubSection, deleteSubSection, updateSubSection } from '../controllers/SubSection.js'
import { addCourseToCategory, categoryPageDetails, createCategory, showAllCategories } from '../controllers/Category.js'
import { createRating, getAllRating, getAverageRating } from '../controllers/RatingAndReviews..js'

const courseRouter = express.Router()


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
courseRouter.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
courseRouter.post("/addSection", auth, isInstructor, createSection)
// Update a Section
courseRouter.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
courseRouter.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
courseRouter.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
courseRouter.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
courseRouter.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
courseRouter.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
courseRouter.post("/getCourseDetails", getCourseDetails)
// Edit a Course
courseRouter.post("/editCourse", auth, isInstructor, editCourse)
// Get all Courses of a Specific Instructor
courseRouter.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
//Get full course details
courseRouter.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Delete a Course
courseRouter.delete("/deleteCourse",auth, deleteCourse)
// Search Courses
courseRouter.post("/searchCourse", searchCourse);
//mark lecture as complete
courseRouter.post("/updateCourseProgress", auth, isStudent, markLectureAsComplete);



// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
courseRouter.post("/createCategory", auth, isAdmin, createCategory)
courseRouter.get("/showAllCategories", showAllCategories)
courseRouter.post("/getCategoryPageDetails", categoryPageDetails)
courseRouter.post("/addCourseToCategory", auth, isInstructor, addCourseToCategory);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
courseRouter.post("/createRating", auth, isStudent, createRating)
courseRouter.get("/getAverageRating", getAverageRating)
courseRouter.get("/getReviews", getAllRating)

export default courseRouter