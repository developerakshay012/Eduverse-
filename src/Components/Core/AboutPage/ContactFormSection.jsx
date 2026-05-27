import React from "react";
import ContactUsForm from '../ConntactUsPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className="mx-auto  border-2 border-gray-700  rounded-md">
      <h1 className="text-center text-4xl font-bold text-yellow-400 mt-10">Get in Touch</h1>
      <p className="text-center text-gray-400 mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-12 mx-auto">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;