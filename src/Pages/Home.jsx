import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { PiArrowBendUpRightBold } from "react-icons/pi";
import { Link } from 'react-router-dom';

import CTAButton from '../Components/Core/HomePage/Button';
import HighlightText from '../Components/Core/HomePage/HighlightText';
import CodeBlocks from "../Components/Core/HomePage/CodeBlocks";
import TimelineSection from '../Components/Core/HomePage/TimelineSection';
import LearningLanguageSection from '../Components/Core/HomePage/LearningLanguageSection';
import InstructorSection from '../Components/Core/HomePage/InstructorSection';
import ExploreMore from '../Components/Core/HomePage/ExploreMore';

import ReviewSlider from '../Components/Common/ReviewSlider';
import Footer from '../Components/Common/Footer';

import Banner from "../assets/Images/banner.mp4";


const Home = () => {
 
  return (
    <div>
        <div className=' mx-auto relative flex flex-col w-11/12 items-center justify-between text-white mt-10'>
            <Link to={"/signup"}>
           <div className="group mt-16 p-1 mx-auto rounded-full bg-[#2e3642] font-bold transition-all duration-200 hover:scale-95 w-max">
                <div className="flex items-center gap-2 rounded-full px-10 py-1.5 transition-all duration-200 group-hover:bg-[#161D29] text-gray-200">
                 <p>Become an Instructor</p>
                 
                <PiArrowBendUpRightBold size={24} />
        </div>
</div>
            </Link>

            <div className='text-center text-3xl md:text-4xl font-semibold mt-7'>
                Master Modern Technology With  <HighlightText text={"Smart Learning"}/>
            </div>
            <div className=' mt-4 w-[90%] text-left md:text-center text-sm md:text-lg font-bold text-[#838894]'>
           Join our interactive online courses and gain real-world skills from anywhere. Learn through practical projects, expert guidance, quizzes, and personalized support to build a successful tech career.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} link to={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"} >Book a Demo</CTAButton>
            </div>

            <div className='mx-3 my-12 shadow-blue-200 w-[90%] relative'>
              <div className='grad2 -top-10 w-200'></div>
            <video className='video'
            muted
            loop
            autoPlay
            >
            <source  src={Banner} type="video/mp4" />
            </video>
        </div>

        <div className='max-w-315 mx-auto' >
            <CodeBlocks 
                position={"lg:flex-row"}
                heading={
                    <div className=' font-semibold text-2xl lg:text-4xl sm:w-full'>
                        Transform Your 
                        <HighlightText text={"Future With Coding Skills"}/> {" "}
                        with our online courses
                    </div>
                }
                subheading = {
                    "Gain industry-ready knowledge from expert instructors and learn through practical projects, interactive content, and personalized support at your own pace."
                }
                ctabtn1={
                    {
                        btnText: "Try it yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                codeColor={"white"}
                backgroudGradient={"grad"}
            />
        </div>      


                {/* Code Section 2 */}
        <div className='max-w-315 mx-auto' >
            <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                       Start Coding 
                        <HighlightText text={"From Day One"}/>
                    </div>
                }
                subheading = {
                    "Experience practical learning with real coding exercises, projects, and guided lessons designed to build your confidence instantly."
                }
                ctabtn1={
                    {
                        btnText: "Continue Lesson",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                codeColor={""}
                backgroudGradient={"grad2"}
            />
        </div>


        <ExploreMore/>


        </div>
        <div className='hidden lg:block lg:h-50 '></div>


        <div className='bg-[#F9F9F9] text-[#2C333F]'>
            <div className='homepage_bg h-77.5'>

                <div className='w-11/12 max-w-315 flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='h-37.5'></div>
                    <div className='flex flex-row gap-7 text-white '>
                        <CTAButton active={true} linkto={"/catalog/Web Developement"}>
                            <div className='flex items-center gap-3' >
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                            
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>

                </div>


            </div>

            <div className='mx-auto w-11/12 max-w-315 flex flex-col items-center justify-between gap-7'>

                <div className='flex lg:flex-row gap-5 mb-10 mt-23.75 flex-col '>
                    <div className='text-4xl font-semibold lg:w-[45%] sm:w-full '>
                        Get the Skills you need for a
                        <HighlightText text={"Job that is in demand"} />
                    </div>

                    <div className='flex flex-col gap-10 lg:w-[40%] items-start sm:w-full '>
                    <div className='text-[16px] '>
                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div>
                            Learn more
                        </div>
                    </CTAButton>
                    </div>

                </div>
                
                

                <TimelineSection />

                <LearningLanguageSection />

            </div>
      </div>



       <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>

            <InstructorSection />

            {/* Review Slider here */}
                <div>
                   <h1 className='text-3xl font-semibold text-center mt-5'> Review from other lerners</h1>
                   <ReviewSlider/>
                </div>
        
      </div>
       <div className='mt-20'>
         <Footer/>
       </div>
    </div>
  )
}

export default Home