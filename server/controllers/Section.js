// const Section = require("../models/Section");
// const Course = require("../models/Course");
import Section from "../models/Section.js";
import Course from "../models/Course.js";



// CREATE a new section
export const createSection = async (req, res) => {
	try {
		// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

		// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}
		
		const ifcourse= await Course.findById(courseId);
		if (!ifcourse) {
			return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

// UPDATE a section
export const updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId,courseId } = req.body;
		console.log(sectionName, sectionId);
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);
		const updatedCourse = await Course.findById(courseId).
		populate({ 
			path: "courseContent", 
			populate: { 
				path: "subSection" 
			} })
			.exec();
		res.status(200).json({
			success: true,
			message: "Section updated successfully",
			updatedCourse,

		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// DELETE a section
export const deleteSection = async (req, res) => {
	try {
        const { sectionId, courseId } = req.body;
        
        // 1. Section delete karo
        await Section.findByIdAndDelete(sectionId);

        // 2. Course content se uss section ki ID remove karo (VVIP)
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $pull: { courseContent: sectionId } },
            { new: true }
        ).populate({
            path: "courseContent",
            populate: { path: "subSection" }
        }).exec();

        res.status(200).json({
            success: true,
            message: "Section deleted",
            updatedCourse, // Frontend par yahi key use karna (Option 1)
        });
		
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};