import React, { useEffect, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import "../../App.css"

// Icons
import { FaStar } from "react-icons/fa"

// Import required modules natively from 'swiper/modules' (New Swiper syntax fixed)
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

// Get apiFunction and the endpoint
import { apiConnector } from "../../Services/apiConnector"
import { ratingsEndpoints } from "../../Services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success) {
          setReviews(data?.data || [])
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      }
    })()
  }, [])

  return (
    <div className="text-white w-full flex justify-center items-center">
      <div className="my-[30px] md:my-[50px] min-h-[204px] w-full max-w-13xl px-4">
        {reviews.length === 0 ? (
          <p className="text-center text-zinc-500 py-4">No Reviews Found</p>
        ) : (
          <Swiper
            spaceBetween={20}
            loop={reviews.length > 4} // Loop tabhi chalega jab data sufficient ho warna tootta hai
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            // ====== FIX 1: SWIPER RESPONSIVE BREAKPOINTS ======
            breakpoints={{
              320: { slidesPerView: 1 },  // Mobile screen par 1 slide
              640: { slidesPerView: 2 },  // Small tablets par 2 slides
              1024: { slidesPerView: 3 }, // Laptops par 3 slides
              1280: { slidesPerView: 4 }, // Big monitors par 4 slides
            }}
            className="w-full"
          >
            {reviews.map((review, i) => {
              return (
                <SwiperSlide key={i}>
                  {/* Card Responsive UI */}
                  <div className="flex flex-col justify-between gap-3 bg-[#161D29] p-4 text-[14px] text-[#DBDDEA] rounded-lg min-h-[180px] border border-[#424854] hover:bg-[#232b3a] transition-colors">
                    
                    {/* Top User Row */}
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          review?.user?.image
                            ? review?.user?.image
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                        }
                        alt="User Profile"
                        className="h-9 w-9 rounded-full object-cover border border-zinc-700"
                      />
                      <div className="flex flex-col max-w-[70%]">
                        <h1 className="font-semibold text-gray-100 truncate">
                          {`${review?.user?.firstName || "Anonymous"} ${review?.user?.lastName || ""}`}
                        </h1>
                        <h2 className="text-[11px] font-medium text-[#585D69] truncate">
                          {review?.course?.courseName}
                        </h2>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="font-medium text-[#DBDDEA] text-xs sm:text-sm leading-relaxed min-h-[40px]">
                      {review?.review?.split(" ").length > truncateWords
                        ? `${review?.review?.split(" ").slice(0, truncateWords).join(" ")} ...`
                        : `${review?.review}`}
                    </p>

                    {/* ====== FIX 2: CUSTOM DYNAMIC RATING STARS ====== */}
                    <div className="flex items-center gap-2 border-t border-zinc-800/60 pt-2">
                      <h3 className="font-semibold text-yellow-400">
                        {(review?.rating || 0).toFixed(1)}
                      </h3>
                      
                      {/* Generates native clean stars loop without any glitchy package */}
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, index) => {
                          const starValue = index + 1;
                          return (
                            <FaStar
                              key={index}
                              size={16}
                              className={
                                starValue <= (review?.rating || 0)
                                  ? "text-yellow-400"
                                  : "text-zinc-700"
                              }
                            />
                          )
                        })}
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        )}
      </div>
    </div>
  )
}

export default ReviewSlider