import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../Services/Operations/courseDetailsApi';
import { getInstructorData } from '../../../../Services/Operations/profileApi';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

function Instructor() {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState([]) 
    const [courses, setCourses] = useState([])
  
    useEffect(() => {
      const getFullData = async () => {
        setLoading(true)
        const instructorApiData = await getInstructorData(token)
        const result = await fetchInstructorCourses(token)
        
        console.log("INSTRUCTOR API DATA => ", instructorApiData)
        
        if (instructorApiData) {
          setInstructorData(instructorApiData)
        }
        if (result) {
          setCourses(result)
        }
        setLoading(false)
      }
      getFullData();
    }, [token]) //  Dependency array handling
  
    // Added array check inside reduce functions
    const totalAmount = Array.isArray(instructorData) 
      ? instructorData.reduce((acc, curr) => acc + (curr.totalAmountGenerated || 0), 0)
      : 0;
  
    const totalStudents = Array.isArray(instructorData)
      ? instructorData.reduce((acc, curr) => acc + (curr.totalStudentsEnrolled || 0), 0)
      : 0;
  
    return (
      <div className="text-white">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#F1F2FF]">
            Hi {user?.firstName} 👋
          </h1>
          <p className="font-medium text-[#999DAA]">
            Let's start something new
          </p>
        </div>

        {loading ? (
          <div className="grid min-h-[50vh] place-items-center">
            <div className="spinner"></div>
          </div>
        ) : courses.length > 0 ? (
          <div className="my-6">
            <div className="my-4 flex flex-col md:flex-row h-auto md:h-[450px] gap-4">
              
              {/* Render chart / graph */}
              <div className="flex-1 bg-[#161D29] p-6 rounded-md">
                {totalAmount > 0 || totalStudents > 0 ? (
                  <InstructorChart courses={instructorData} />
                ) : (
                  <div className="h-full flex flex-col justify-center items-center">
                    <p className="text-lg font-bold text-[#DBDDEA]">Visualize</p>
                    <p className="mt-4 text-xl font-medium text-[#DBDDEA]">
                      Not Enough Data To Visualize
                    </p>
                  </div>
                )}
              </div>

              {/* Total Statistics */}
              <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6 justify-between gap-y-4">
                <p className="text-lg font-bold text-yellow-400">Statistics</p>
                <div className="space-y-4 flex-1 flex flex-col justify-center">
                  <div>
                    <p className="text-lg text-[#999DAA]">Total Courses</p>
                    <p className="text-3xl font-semibold text-[#DBDDEA]">{courses.length}</p>
                  </div>
                  <div>
                    <p className="text-lg text-[#999DAA]">Total Students</p>
                    <p className="text-3xl font-semibold text-[#DBDDEA]">{totalStudents}</p>
                  </div>
                  <div>
                    <p className="text-lg text-[#999DAA]">Total Income</p>
                    <p className="text-3xl font-semibold text-[#DBDDEA]">Rs. {totalAmount}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Render 3 courses list panel */}
            <div className="rounded-md bg-[#161D29] p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-bold text-[#F1F2FF]">Your Courses</p>
                <Link to="/dashboard/my-courses">
                  <p className="text-xs font-semibold text-[#FFD166] hover:underline">View All</p>
                </Link>
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6">
                {courses.slice(0, 3).map((course) => (
                  <div key={course._id} className="w-full md:w-1/3 bg-[#000814] rounded-md overflow-hidden pb-3 border border-[#2C333F]/50">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[201px] w-full object-cover"
                    />
                    <div className="mt-3 px-3 w-full">
                      <p className="text-sm font-semibold text-[#C5C7D4] truncate">
                        {course.courseName}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-xs text-[#838894]">
                        <p>{(course?.studentsEnrolled?.length || course?.studentsEnroled?.length || 0)} Students</p>
                        <p className="font-bold text-[#FFD166]">Rs. {course?.price || 0}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 rounded-md bg-[#161D29] p-6 py-20">
            <p className="text-center text-2xl font-bold text-gray-200">
              You have not created any courses yet
            </p>
            <Link to="/dashboard/add-course">
              <p className="mt-2 text-center text-lg font-semibold text-[#FFD166] hover:underline">
                Create a course
              </p>
            </Link>
          </div>
        )}
      </div>
    )
  }

export default Instructor;