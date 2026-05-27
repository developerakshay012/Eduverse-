import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineScreenShare } from "react-icons/md";
import copy from "copy-text-to-clipboard";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../Utils/Constants";
import { addToCart } from "../../../Slices/cartSlice";

const CourseDetailsCard = ({ course, setConfirmationModal, handleBuyCourse }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { thumbnail: ThumbnailImage, price: CoursePrice } = course;

  const handleAddToCart = () => {
    console.log("clicking here ");
    if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("you are an instructor you cant buy a course");
      return;
    }

    if (token) {
      dispatch(addToCart(course));
      return;
    }

    setConfirmationModal({
      text1: "you are not Logged In..",
      text2: "please login to purchace this course",
      btn1Text: "Login",
      btn2Text: "Cancle",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied successfully");
  };

  return (
    <div className="flex flex-col gap-4 rounded-md bg-[#2C333F] p-4 text-[#F1F2FF]">
      <img
        src={ThumbnailImage}
        className="max-h-75 min-h-45 w-100 rounded-xl"
        alt="thumbnail image"
      />

      <div> <p className="text-2xl font-semibold text-yellow-400"> Rs. {CoursePrice} </p> </div>

      <div className="flex flex-col  gap-y-6">
        {user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
          <div className="flex flex-col gap-y-6">
            <button
              className="cursor-pointer rounded-md bg-yellow-400 px-5 py-2 font-semibold text-[#000814]"
              onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course.studentsEnrolled.includes(user?._id)
                ? "Go to Course"
                : "Buy Now"}
            </button>

            {!course?.studentsEnrolled.includes(user?._id) && (
              <button 
              className="cursor-pointer rounded-md bg-[#161D29] px-5 py-2 font-semibold text-gray-200"
               onClick={handleAddToCart}>
                Add to Cart
              </button>
            )}
          </div>
        )}

        {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <div className="mt-6">
            <p className="font-semibold text-lg mb-4">This course includes</p>

            <div className="flex flex-col gap-y-3 text-sm text-green-500">
              <p>✓ Regular practice</p>
              <p>✓ Discussions and exercises</p>
              <p>✓ Python documentation to deepen your understanding</p>
            </div>
          </div>
        )}
      </div>

      <div className="">
        <p className=" text-gray-200">30-Day Money-Back Guarantee</p>

        <p className=" text-green-400">This course Included</p>

        <div className="flex flex-col gap-y-3">
          {course.instructions.map((item, index) => (
            <p
            className=" text-green-400"
            key={index}>
              <span >{item}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="">
        <button
          onClick={handleShare}
          className="mx-auto flex items-center gap-2  cursor-pointer p-6 text-yellow-400"
        >
          <MdOutlineScreenShare /> Share
        </button>
      </div>
    </div>
  );
};

export default CourseDetailsCard;

// http://localhost:5173/courses/6a00c7cce950505bab7ee18a
