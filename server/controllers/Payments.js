// const {instance} = require("../config/razorpay");
import { instance } from "../config/razorpay.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import mailSender from "../utils/mailSender.js";
import courseEnrollmentEmail from "../template/courseEnrollmentEmail.js";
import paymentSuccess from "../template/paymentSuccess.js";
import mongoose from "mongoose";
import crypto from "crypto";
import CourseProgress from "../models/CourseProgress.js";
import dotenv from 'dotenv'
import Razorpay from "razorpay"; // 👈 Ensure this is imported




// Path check kar lijiye aapke setup ke mutabik

export const capturePayment = async (req, res) => {
    try {
        const { courses } = req.body;
        const userId = req.user.id;

        console.log("=== BACKEND RECEIVED COURSE IDs ===", courses);
        console.log("=== BACKEND USER ID FROM AUTH ===", userId);

        // 1. Validation check
        if (!courses || courses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid course IDs",
            });
        }

        let totalAmount = 0;

        // 2. Loop through courses
        for (const course_id of courses) {
            try {
                const courseDetails = await Course.findById(course_id);

                if (!courseDetails) {
                    return res.status(404).json({
                        success: false,
                        message: `Could not find the course with id: ${course_id}`,
                    });
                }

                if (!courseDetails.studentsEnrolled) {
                    courseDetails.studentsEnrolled = [];
                }

                const isAlreadyEnrolled = courseDetails.studentsEnrolled.some(
                    (enrolledId) => enrolledId.toString() === userId.toString()
                );

                if (isAlreadyEnrolled) {
                    return res.status(400).json({
                        success: false,
                        message: `Student already enrolled in course: ${courseDetails.courseName || course_id}`,
                    });
                }

                totalAmount += courseDetails.price;

            } catch (innerError) {
                console.error("Error processing course ID:", course_id, innerError);
                return res.status(500).json({
                    success: false,
                    message: `Database error for course ID: ${course_id}`,
                });
            }
        }

        // 3. Razorpay Options setup
        const options = {
            amount: totalAmount * 100, // Amount converts to Paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        // 4. Create Razorpay Order
        try {
            // Environment variable configuration with hardcoded safety match keys
            const keyId = process.env.RAZORPAY_KEY_ID ;
            console.log(process.env.RAZORPAY_KEY_ID , "is from backend")
            const keySecret = process.env.RAZORPAY_SECRET ;

            console.log("=== INITIALIZING RAZORPAY WITH KEY ===", keyId);

            const localInstance = new Razorpay({
                key_id: keyId,
                key_secret: keySecret,
            });

            const paymentResponse = await localInstance.orders.create(options);
            console.log("=== RAZORPAY ORDER CREATED SUCCESSFULLY ===", paymentResponse);

            return res.status(200).json({
                success: true,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            });

        } catch (razorpayError) {
            console.error("Razorpay Order Creation Instance Error:", razorpayError);
            return res.status(500).json({
                success: false,
                message: "Could not initiate Razorpay order structure",
            });
        }

    } catch (globalError) {
        console.error("CRITICAL GLOBAL CAPTURE PAYMENT ERROR:", globalError);
        return res.status(500).json({
            success: false,
            message: globalError.message || "Internal Server Error",
        });
    }
};



// verify the signature
export const verifySignature = async (req, res) => {
    try {
        // 1. Get payment details from request body
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            courses, // This is an array of strings: ["ID1", "ID2"]
        } = req.body;

        const userId = req.user.id;

        // 2. Validation
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !courses || !userId) {
            return res.status(400).json({
                success: false,
                message: "Payment details are incomplete",
            });
        }

        // 3. Verify Signature
        const body = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed",
            });
        }

        // 4. Enroll student in courses
        // Use course_id directly from the array
        for (const course_id of courses) {
            try {
                // UPDATE COURSE: Add student to the course
                const enrolledCourse = await Course.findByIdAndUpdate(
                    course_id,
                    { $push: { studentsEnrolled: userId } },
                    { new: true }
                );

                if (!enrolledCourse) {
                    return res.status(404).json({
                        success: false,
                        message: `Course not found: ${course_id}`,
                    });
                }

                // CREATE COURSE PROGRESS
                const courseProgress = await CourseProgress.create({
                    courseID: course_id,
                    userID: userId,
                    completedVideos: [],
                });

                // UPDATE USER: Add course and progress to user profile
                await User.findByIdAndUpdate(
                    userId,
                    {
                        $push: {
                            courses: course_id,
                            courseProgress: courseProgress._id,
                        },
                    },
                    { new: true }
                );

                // 5. Send confirmation mail
                const recipient = await User.findById(userId);
                await mailSender(
                    recipient.email,
                    `Successfully Enrolled into ${enrolledCourse.courseName}`,
                    courseEnrollmentEmail(
                        enrolledCourse.courseName,
                        `${recipient.firstName} ${recipient.lastName}`,
                        enrolledCourse.courseDescription,
                        enrolledCourse.thumbnail
                    )
                );
                
            } catch (loopError) {
                console.error("Error during enrollment loop:", loopError);
                // Continue to next course even if one fails, or handle as needed
            }
        }

        return res.status(200).json({
            success: true,
            message: "Payment verified and course enrolled successfully",
        });

    } catch (error) {
        console.log("VERIFY PAYMENT ERROR => ", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
//send email

export const sendPaymentSuccessEmail = async (req, res) => {
    const {amount,paymentId,orderId} = req.body;
    const userId = req.user.id;
    if(!amount || !paymentId) {
        return res.status(400).json({
            success:false,
            message:'Please provide valid payment details',
        });
    }
    try{
        const enrolledStudent =  await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Study Notion Payment successful`,
            paymentSuccess(amount/100, paymentId, orderId, enrolledStudent.firstName, enrolledStudent.lastName),
        );
}
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//     //get courseId and UserID
//     const {course_id} = req.body;
//     const userId = req.user.id;
//     //validation
//     //valid courseID
//     if(!course_id) {
//         return res.json({
//             success:false,
//             message:'Please provide valid course ID',
//         })
//     };
//     //valid courseDetail
//     let course;
//     try{
//         course = await Course.findById(course_id);
//         if(!course) {
//             return res.json({
//                 success:false,
//                 message:'Could not find the course',
//             });
//         }

//         //user already pay for the same course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success:false,
//                 message:'Student is already enrolled',
//             });
//         }
//     }
//     catch(error) {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }

//     //order create
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId: course_id,
//             userId,
//         }
//     };

//     try{
//         //initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);
//         //return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         });
//     }
//     catch(error) {
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order",
//         });
//     }

// };

// //verify Signature of Razorpay and Server

// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "12345678";

//     const signature = req.headers["x-razorpay-signature"];

//     const shasum =  crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest) {
//         console.log("Payment is Authorised");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try{
//                 //fulfil the action

//                 //find the course and enroll the student in it
//                 const enrolledCourse = await Course.findOneAndUpdate(
//                                                 {_id: courseId},
//                                                 {$push:{studentsEnrolled: userId}},
//                                                 {new:true},
//                 );

//                 if(!enrolledCourse) {
//                     return res.status(500).json({
//                         success:false,
//                         message:'Course not Found',
//                     });
//                 }

//                 console.log(enrolledCourse);

//                 //find the student andadd the course to their list enrolled courses me
//                 const enrolledStudent = await User.findOneAndUpdate(
//                                                 {_id:userId},
//                                                 {$push:{courses:courseId}},
//                                                 {new:true},
//                 );

//                 console.log(enrolledStudent);

//                 //mail send krdo confirmation wala
//                 const emailResponse = await mailSender(
//                                         enrolledStudent.email,
//                                         "Congratulations from CodeHelp",
//                                         "Congratulations, you are onboarded into new CodeHelp Course",
//                 );

//                 console.log(emailResponse);
//                 return res.status(200).json({
//                     success:true,
//                     message:"Signature Verified and COurse Added",
//                 });

//         }
//         catch(error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
//     }
//     else {
//         return res.status(400).json({
//             success:false,
//             message:'Invalid request',
//         });
//     }

// };
