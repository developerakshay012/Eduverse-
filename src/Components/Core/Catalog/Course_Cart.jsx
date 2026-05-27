import React, { useEffect, useState } from 'react'
import RatingStar from '../../Common/RatingStar'
import GetAvgRating from '../../../Utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course?.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course]);

    return (
        <>
            <Link to={`/courses/${course._id}`}>
                <div className=''>
                    <div className="rounded-lg">
                        <img
                            src={course?.thumbnail}
                            alt="course thumbnail"
                            className={`${Height} w-full rounded-xl object-cover`}
                        />
                    </div>
                    <div className="flex flex-col gap-2 px-1 py-3">
                        <p className="text-xl text-[#F1F2FF] uppercase">{course?.courseName}</p>
                        <p className="text-xl text-yellow-300 font-semibold uppercase">
                           <span>BY</span> {course?.instructor?.firstName} {course?.instructor?.lastName}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-400 text-xl">{avgReviewCount || 0}</span>
                            {/* Fixed mismatch in component name from RatingStars to RatingStar */}
                            <RatingStar Review_Count={avgReviewCount} /> 
                            <span className="text-[#6E727F]">
                                {course?.ratingAndReviews?.length} Ratings
                            </span>
                        </div>
                        <p className="text-xl text-[#F1F2FF]">Rs. {course?.price}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Course_Card;