// const Profile = require("../models/Profile");
// const User = require("../models/User");
// const Course = require("../models/Course");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");

import Profile from "../models/Profile.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import  uploadImageToCloudinary  from "../utils/uploadImageToCloudinary.js";


// Method for updating a profile
// Method for updating a profile
export const updateProfile = async (req, res) => {
  try {

    console.log("BODY => ", req.body);
    console.log("USER => ", req.user);
    console.log("USER ID => ", req.user.id);

    const {
      dateOfBirth,
      about,
      contactNumber,
      firstName,
      lastName,
      gender,
    } = req.body;

    const id = req.user.id;

    // 1. Find User
    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. Find Profile
    let profileDetails = await Profile.findById(
      userDetails.additionalDetails
    );

    console.log("USER DETAILS => ", userDetails);
    console.log("PROFILE => ", profileDetails);

    // 3. Agar profile nahi mili to new create karo
    if (!profileDetails) {

      profileDetails = await Profile.create({
        gender: "",
        dateOfBirth: "",
        about: "",
        contactNumber: "",
      });

      // user me new profile id save karo
      userDetails.additionalDetails = profileDetails._id;

      await userDetails.save();
    }

    // 4. Update user fields
    if (firstName) {
      userDetails.firstName = firstName;
    }

    if (lastName) {
      userDetails.lastName = lastName;
    }

    // 5. Update profile fields
    if (dateOfBirth) {
      profileDetails.dateOfBirth = dateOfBirth;
    }

    if (about) {
      profileDetails.about = about;
    }

    if (gender) {
      profileDetails.gender = gender;
    }

    if (contactNumber) {
      profileDetails.contactNumber = contactNumber;
    }

    // 6. Save updated data
    await userDetails.save();
    await profileDetails.save();

    // 7. Fetch updated user
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });

  } catch (error) {

    console.log("Error during profile update:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};



export const deleteAccount = async (req, res) => {
	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
		const id = req.user.id;
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ 
        success: false, 
        message: "User Cannot be deleted successfully",
        error:error.message
       });
	}
};




export const getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const getEnrolledCourses = async (req, res) => {
    try {

        const id = req.user.id;

        const enrolledCourses = await User.findById(id)
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                },
            })
            .populate("courseProgress")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Enrolled Courses fetched successfully",
            data: enrolledCourses.courses,
        });

    } 
    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//updateDisplayPicture
export const updateDisplayPicture = async (req, res) => {
	try {

		const id = req.user.id;
	const user = await User.findById(id);
	if (!user) {
		return res.status(404).json({
            success: false,
            message: "User not found",
        });
	}

	const image = req.files.displayPicture || req.files.pfp;
	if (!image) {
            return res.status(400).json({ // 400 use karo (Bad Request)
                success: false,
                message: "Image file is missing in the request",
            });
        }
	const uploadDetails = await uploadImageToCloudinary(
		image,
		process.env.FOLDER_NAME
	);
	console.log(uploadDetails);

	const updatedImage = await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{ new: true });

    res.status(200).json({
        success: true,
        message: "Image updated successfully",
        data: updatedImage,
    });
		
	} catch (error) {
		return res.status(500).json({
            success: false,
            message: error.message,
        });
		
	}



}

//instructor dashboard
// instructor dashboard controller
export const instructorDashboard = async (req, res) => {
  try {
    const id = req.user.id;
    const courseData = await Course.find({ instructor: id });
    
    const courseDetails = courseData.map((course) => {
      // Safe extraction with fallback arrays
      const totalStudentsEnrolled = course?.studentsEnrolled?.length || 0;
      const totalAmountGenerated = (course?.price || 0) * totalStudentsEnrolled;
      
      const courseStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled, // 👈 Name changed to sync with Frontend
        totalAmountGenerated,  // 👈 Name changed to sync with Frontend
      };
      return courseStats;
    });

    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}