import React from "react"

import Footer from "../Components/Common/Footer"
import ContactDetails from "../Components/Core/ConntactUsPage/ContactDetails"
import ContactForm from "../Components/Core/ConntactUsPage/ContactForm"
import ReviewSlider from "../Components/Common/ReviewSlider"




const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-40 flex w-11/12 max-w-315 flex-col justify-between gap-10 text-white lg:flex-row mb-10">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[49%]">
          <ContactForm />
        </div>
      </div>

        <div>
           <h1 className="text-3xl  font-semibold lg:text-4xl text-center ">Review from other learners</h1>
           <ReviewSlider/>
        </div>
      
      <Footer />
    </div>
  )
}

export default Contact