import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../Services/Operations/courseDetailsAPI"
import IconBtn from "../../Common/IconBtn"
import CoursesTable from "./InsctructorCourse/CourseTable"

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
  <div className="mb-14 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    
    <h1 className="text-3xl font-medium text-[#F1F2FF]">
      My Courses
    </h1>

    <div className="flex justify-end md:justify-normal">
      <IconBtn
        text="Add Course"
        onclick={() => navigate("/dashboard/add-course")}
        customClasses="text-sm px-3 py-2"
      >
        <VscAdd />
      </IconBtn>
    </div>

  </div>

  {courses && (
    <CoursesTable courses={courses} setCourses={setCourses} />
  )}
</div>
  )
}

export default MyCourses