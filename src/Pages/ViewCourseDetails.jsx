import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../Services/Operations/courseDetailsApi'
import VideoDetailsSidebar from '../Components/Core/ViewCourse/VideoDetailsSidebar'
import { 
    setCompletedLectures, 
    setCourseSectionData, 
    setEntireCourseData,
    setTotalNoOfLectures 
} from '../Slices/viewCourseSlice'
import CourseReviewModal from '../Components/Core/ViewCourse/CourseReviewModal'
import Footer from '../Components/Common/Footer'

const ViewCourseDetails = () => {
    const [reviewModal, setReviewModal] = useState(false)
    const { courseId } = useParams() 
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    useEffect(() => {
        const getFullcourseDetails = async () => {
            if (!courseId || !token) return;
            try {
                const courseData = await getFullDetailsOfCourse(courseId, token)
                if (courseData) {
                    dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent || []));
                    dispatch(setEntireCourseData(courseData?.courseDetails || null));
                    dispatch(setCompletedLectures(courseData?.completedVideos || []))

                    let lectures = 0;
                    courseData?.courseDetails?.courseContent?.forEach((sec) => {
                        lectures += sec?.subSection?.length || 0
                    })
                    dispatch(setTotalNoOfLectures(lectures))
                }
            } catch (error) {
                console.error("Error fetching course full details:", error)
            }
        }
        getFullcourseDetails()
    }, [courseId, token, dispatch])

    return (
        <>
            {/* FIX: 'flex-col md:flex-row' lagaya hai. 
              Isse mobile par sidebar upar aur video niche aayegi (ya collapse hogi),
              aur tablet/desktop par side-by-side (flex-row) ho jayegi.
            */}
            <div className="relative flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)] w-full">
                
                {/* Sidebar Component */}
                <VideoDetailsSidebar setReviewModal={setReviewModal} />
                
                {/* Main Video Content Area */}
                <div className="flex-1 h-auto overflow-y-auto bg-[#171717]">
                    <div className='mx-3 sm:mx-6 my-4'>
                        {/* Yahan aapka VideoDetails load hota hai */}
                        <Outlet />
                    </div>
                </div>
                
            </div>

                <Footer/>

            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}


        </>
    )
}

export default ViewCourseDetails