import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../Components/Common/ConfirmationModal"
import Footer from "../Components/Common/Footer"
import RatingStars from "../Components/Common/RatingStar"
import CourseAccordionBar from "../Components/Core/Course/CourseAccordionBar"
import CourseDetailsCard from "../Components/Core/Course/CourseDetailsCard"
import { formattedDate } from "../Utils/formattedDate"
import { fetchCourseDetails } from "../Services/Operations/courseDetailsApi"
import { buyCourse } from "../Services/Operations/studentFeatureApi"
import GetAvgRating from "../Utils/avgRating"
import Error from "./Error"

function  CourseDetailsPage() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Getting courseId from url parameter
  const { courseId } = useParams()
  // console.log(`course id: ${courseId}`)

  // Declear a state to save the course details
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  useEffect(() => {
    // Calling fetchCourseDetails fucntion to fetch the details
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        // console.log("course details res: ", res)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  }, [courseId])

  // console.log("response: ", response)

  // Calculating Avg Review count
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
   const count = GetAvgRating(response?.data?.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])
  // console.log("avgReviewCount: ", avgReviewCount)

  // // Collapse all
  // const [collapse, setCollapse] = useState("")
  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }

  // Total number of lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
   response?.data?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!response.success) {
    return <Error />
  }

  const courseDetails = response?.data;

  const {
    id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseDetails 

  const handleBuyCourse = () => {
    if (token) {
      console.log("clicking here");
      buyCourse(token, [courseId], user, navigate, dispatch)
      // buyCourse(token, [courseId], user, navigate, dispatch);
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (paymentLoading) {
    // console.log("payment loading")
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className={`relative w-full bg-[#161D29]`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-315 2xl:relative ">
          <div className="mx-auto grid min-h-112.5 max-[1260px] justify-items-center
           py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-202.5">
            <div className="relative block max-h-120 lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-[#F1F2FF]`}
            >
              <div>
                <p className="text-4xl font-bold text-[#F1F2FF] sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`text-richblack-200`}>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-[#FFE83D]">{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formattedDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-[#585D69] py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-[#F1F2FF]">
                Rs. {price}...
              </p>
              <button 
              className="cursor-pointer rounded-md bg-yellow-400 px-5 py-2 font-semibold text-[#000814]" 
              onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="cursor-pointer rounded-md bg-[#161D29] px-5 py-2.5 font-semibold text-gray-200">Add to Cart</button>
            </div>
          </div>
          {/* Courses Card */}
          <div className="right-4 top-15 mx-auto hidden min-h-150 w-1/3 max-w-102.5 translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={response?.data}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-[#ECF5FF] lg:w-315">
        <div className="mx-auto max-w-315 lg:mx-0 xl:max-w-202.5">
          {/* What will you learn section */}
          <div className="my-8 border border-[#042E3B] p-8">
            <p className="text-3xl font-semibold text-yellow-400">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-207.5 ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold text-yellow-400">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span className="text-gray-200">
                    {courseContent.length} {`section(s)`}
                  </span>
                  <span className="text-gray-200">
                    {totalNoOfLectures} {`lecture(s)`}
                  </span >
                  <span className="text-gray-200">{response.data?.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-400"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              {/* <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div> */}
              <p className="text-gray-200">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CourseDetailsPage


// import React, { useEffect, useState } from "react";
// import { buyCourse } from "../Services/Operations/studentFeatureApi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchCourseDetails } from "../Services/Operations/courseDetailsApi";
// import { setCourse } from "../Slices/courseSlice";
// import GetAvgRating from "../Utils/avgRating";
// import Error from "./Error";
// import ConfirmationModal from "../Components/Common/ConfirmationModal";
// import RatingStar from "../Components/Common/RatingStar";
// import { formattedDate } from "../Utils/formattedDate";
// import CourseDetailsCard from "../Components/Core/Course/CourseDetailsCard";
// import { BiInfoCircle } from "react-icons/bi";
// import { HiOutlineGlobeAlt } from "react-icons/hi";
// import ReactMarkdown from "react-markdown";
// import CourseAccordionBar from "../Components/Core/Course/CourseSubSectionAccordion";

// const CourseDetailsPage = () => {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const courseId = useParams();
//   const { loading } = useSelector((state) => state.profile);
//   const { paymentLoading } = useSelector((state) => state.course);

//   const [courseData, setCourseData] = useState(null);
//   const [confirmationModal, setConfirmationModal] = useState(null);

//   useEffect(() => {
//     const getFullCoursedetails = async () => {
//       try {
//         const result = await fetchCourseDetails(courseId);

//         setCourseData(result);
//         console.log(result, "this is course data...");
//       } catch (error) {
//         console.log("could not fetch course details");
//       }
//     };
//     getFullCoursedetails();
//   }, [courseId]);

//   const [avgRatingCount, setAvgRatingCount] = useState(0);

//   useEffect(() => {
//     const avg = GetAvgRating(courseData?.data?.CourseDetails?.ratingAndReviews);
//     setAvgRatingCount(avg);
//   }, [courseData]);

//   const [totalNoOfLecture, setTotalNoOfLecture] = useState(0);

//   useEffect(() => {
//     let lectures = 0;
//      courseData?.data?.courseContent?.forEach((sec) => {
//     lectures += sec.subSection?.length || 0;
//   });

//     setTotalNoOfLecture(lectures)
//   }, [courseData]);

//   const handleBuyCourse = async () => {
//     if (token) {
//       buyCourse(token, [courseId], user, navigate, dispatch);
//       // console.log("this is from but" ,buyCourse);
//       return;
//     }
//     setConfirmationModal({
//       text1: "you are not Logged In..",
//       text2: "please login to purchace this course",
//       btn1Text: "Login",
//       btn2Text: "Cancle",
//       btn1Handler: () => navigate("/login"),
//       btn2Handler: () => setConfirmationModal(null),
//     });
//   };


//     const [isActive, setIsActive] = useState(Array(0))
//   const handleActive = (id) => {
//     // console.log("called", id)
//     setIsActive(
//       !isActive.includes(id)
//         ? isActive.concat([id])
//         : isActive.filter((e) => e != id)
//     )
//    }

//   if (loading || !courseData) {
//     return <div>loading...</div>;
//   }

//   if (!courseData.success) {
//     return (
//       <div>
//         <Error />
//       </div>
//     );
//   }

//   const courseDetails = courseData?.data;
//   console.log(courseData, "sdfjksdkj");
//   if (!courseDetails) {
//     return <div>No Course Found</div>;
//   }

//   const {
//     id: course_id,
//     courseName,
//     courseDescription,
//     instructor,
//     price,
//     ratingAndReviews,
//     studentsEnrolled,
//     tag,
//     thumbnail,
//     courseContent,
//     createdAt,
//     whatYouWillLearn,
//   } = courseDetails;

//  return (
//   <>
//     <div className="relative w-full bg-[#161D29]">
//       {/* Hero Section */}
//       <div className="mx-auto w-11/12 max-w-maxContent flex flex-col lg:relative text-white">

//         <div className="py-8 lg:w-[70%]">
          
//           {/* Mobile Thumbnail */}
//           <div className="block lg:hidden mb-6">
//             <img
//               src={thumbnail}
//               alt="thumbnail"
//               className="w-full rounded-xl"
//             />
//           </div>

//           <div className="flex flex-col gap-4">
//             <h1 className="text-3xl font-bold lg:text-4xl">
//               {courseName}
//             </h1>

//             <p className="text-richblack-200">
//               {courseDescription}
//             </p>

//             {/* Rating */}
//             <div className="flex flex-wrap items-center gap-2">
//               <span className="text-yellow-100">
//                 {avgRatingCount}
//               </span>

//               <RatingStar
//                 Review_Count={avgRatingCount}
//                 Star_Size={24}
//               />

//               <span>
//                 ({ratingAndReviews.length} reviews)
//               </span>

//               <span>
//                 {studentsEnrolled.length} students enrolled
//               </span>
//             </div>

//             {/* Instructor */}
//             <p>
//               Created By{" "}
//               {instructor.firstName} {instructor.lastName}
//             </p>

//             {/* Date + Language */}
//             <div className="flex flex-wrap gap-5">

//               <p className="flex items-center gap-2">
//                 <BiInfoCircle />
//                 Created At {formattedDate(createdAt)}
//               </p>

//               <p className="flex items-center gap-2">
//                 <HiOutlineGlobeAlt />
//                 English
//               </p>

//             </div>
//           </div>

//           {/* Mobile Card */}
//           <div className="mt-8 lg:hidden">
//             <CourseDetailsCard
//               course={courseDetails}
//               setConfirmationModal={setConfirmationModal}
//               buyhandler={handleBuyCourse}
//             />
//           </div>
//         </div>

//         {/* Desktop Card */}
//         <div className="hidden lg:block absolute right-0 top-10 w-87.5">
//           <CourseDetailsCard
//             course={courseDetails}
//             setConfirmationModal={setConfirmationModal}
//             buyhandler={handleBuyCourse}
//           />
//         </div>

//       </div>
//     </div>

//     {/* Main Content */}
//     <div className="mx-auto w-11/12 max-w-maxContent text-white py-10">

//       <div className="lg:w-[70%]">

//         {/* What You Will Learn */}
//         <div className="border border-richblack-700 p-6 rounded-xl">
//           <h2 className="text-2xl font-semibold mb-5">
//             What you'll learn
//           </h2>

//           <div className="text-richblack-100">
//             <ReactMarkdown>
//               {whatYouWillLearn}
//             </ReactMarkdown>
//           </div>
//         </div>

//         {/* Course Content */}
//         <div className="mt-10">

//           <div className="flex flex-col gap-3">
//             <h2 className="text-3xl font-semibold">
//               Course Content
//             </h2>

//             <div className="flex flex-wrap justify-between">

//               <div className="flex gap-4 text-sm text-richblack-200">

//                 <span>
//                   {courseContent.length} Sections
//                 </span>

//                 <span>
//                   {totalNoOfLecture} Lectures
//                 </span>

//                 <span>
//                   {courseData.data?.totalDuration} total length
//                 </span>

//               </div>

//               <button
//                 onClick={() => setIsActive([])}
//                 className="text-yellow-50"
//               >
//                 Collapse all Sections
//               </button>

//             </div>
//           </div>

//           {/* Accordion */}
//           <div className="mt-6 flex flex-col gap-4">

//             {
//               courseContent?.map((course, index) => (
//                 <CourseAccordionBar
//                   key={index}
//                   course={course}
//                   isActive={isActive}
//                   handleActive={handleActive}
//                 />
//               ))
//             }

//           </div>

//         </div>

//         {/* Author */}
//         <div className="mt-12">

//           <h2 className="text-3xl font-semibold">
//             Author
//           </h2>

//           <div className="flex items-center gap-4 mt-5">

//             <img
//               src={instructor?.image}
//               alt="author"
//               className="h-14 w-14 rounded-full object-cover"
//             />

//             <p className="text-lg">
//               {instructor.firstName} {instructor.lastName}
//             </p>

//           </div>

//           <p className="mt-4 text-richblack-200">
//             {instructor?.additionalDetails?.about}
//           </p>

//         </div>

//       </div>
//     </div>

//     {confirmationModal && (
//       <ConfirmationModal modalData={confirmationModal} />
//     )}
//   </>
// );
// };

// export default CourseDetailsPage;
