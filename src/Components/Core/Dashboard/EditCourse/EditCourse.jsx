import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import RenderSteps from '../AddCourse/RenderSteps.jsx'
import { getFullDetailsOfCourse } from '../../../../Services/Operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../Slices/courseSlice'


const EditCourse = () => {
    
    const {course} = useSelector((state) => state.course)
    const {courseId} = useParams()
    const [loading , setLoading] = useState(false) 
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        const populateCourseDetails = async() => {
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId , token)
            if(result?.courseDetails){
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false)
        }
        populateCourseDetails()
    },[])



    if(loading){
        return 
        <div>Loading....</div>
    }

  return (

    <div> 
         <h1 className='text-3xl font-semibold text-center mt-8 mb-8 text-yellow-400'>Edit Course</h1>

            <div>
                {
                    course ? (  <div className='w-[60%] mx-auto'> <RenderSteps /> </div>  ) : ( <p>Course Not Found</p>)
                }
            </div>

            

    </div>
  )
}

export default EditCourse