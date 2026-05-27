import { useEffect, useState } from "react";
// Kisi package ki zaroorat nahi hai ab ❌
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../../Services/Operations/profileApi";

function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const getEnrolledCoursesData = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      console.log("ENROLLED COURSES => ", res);
      setEnrolledCourses(res || []);
    } catch (error) {
      console.log("Could not fetch enrolled courses.", error);
    }
  };

  useEffect(() => {
    getEnrolledCoursesData();
  }, []);

  return (
    <>
      <div className="text-3xl text-[#C5C7D4]">
        Enrolled Courses
      </div>

      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : enrolledCourses.length === 0 ? (
        <p className="grid h-[10vh] w-full place-content-center font-sans text-[#F1F2FF]">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-[#F1F2FF]">
          {/* Heading */}
          <div className="flex rounded-t-lg bg-[#585D69]">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>

          {/* Courses */}
          {Array.isArray(enrolledCourses) &&
            enrolledCourses.map((course, i, arr) => (
              <div
                key={course?._id || i}
                className={`flex items-center border border-[#2C333F] ${
                  i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
              >
                {/* Left Section */}
                <div
                  className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => {
                    console.log("Full Course:", course);
                    navigate(
                      `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]}`
                    );
                  }}
                >
                  <img
                    src={course?.thumbnail}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg object-cover"
                  />

                  <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-semibold">
                      {course?.courseName || "Untitled Course"}
                    </p>
                    <p className="text-xs text-gray-300">
                      {course?.courseDescription?.length > 50
                        ? `${course.courseDescription.slice(0, 50)}...`
                        : course?.courseDescription || "No Description"}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="w-1/4 px-2 py-3">
                  {course?.totalDuration || "0min"}
                </div>

                {/* Progress */}
                <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                  <p>Progress: {course?.progressPercentage || 0}%</p>
                  
                  {/* --- Ekdum Mast Tailwind Progress Bar --- */}
                  <div className="h-2 w-full rounded-full bg-[#2C333F] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-yellow-400 transition-all duration-500 ease-out"
                      style={{
                        width: `${Math.min(Math.max(course?.progressPercentage || 0, 0), 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default EnrolledCourses;