

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination, Autoplay } from 'swiper/modules' // Autoplay add kiya

import Course_Card from './Course_Cart'

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination, Autoplay]} // Modules list yahan deni hogi
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-120"
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={true} // Dots dikhane ke liye
        >
          {Courses?.map((course, index) => (
            <SwiperSlide key={index}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-[#C5C7D4]">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider