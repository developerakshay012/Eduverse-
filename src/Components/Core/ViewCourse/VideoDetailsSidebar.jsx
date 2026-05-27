import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../Common/IconBtn";
import { IoIosArrowBack } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");

  const {
    courseSectionData = [],
    courseEntireData,
    totalNoOfLectures,
    completedLectures = [],
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData || !courseSectionData.length) return;

      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      if (currentSectionIndx === -1) return;

      const currentSubSectionIndx =
        courseSectionData?.[currentSectionIndx]?.subSection?.findIndex(
          (data) => data._id === subSectionId
        );

      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseSectionData, courseEntireData, sectionId, subSectionId]);

  return (
    // Responsive Optimization: Mobile par full width, tablet/desktop par fixed width (320px)
    <div className="w-full lg:w-[320px] md:w-[280px] h-auto md:h-[calc(100vh-3.5rem)] flex flex-col border-b md:border-b-0 md:border-r border-[#2C333F] bg-[#161D29]">
      
      {/* Top Section */}
      <div className="mx-4 flex flex-col items-start justify-between gap-3 border-b border-[#424854] py-4 text-[#DBDDEA]">
        <div className="flex w-full items-center justify-between gap-2">
          <div
            onClick={() => navigate(`/dashboard/enrolled-courses`)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#AFB2BF] p-1 text-[#2C333F] hover:scale-95 cursor-pointer transition-all duration-200"
            title="back"
          >
            <IoIosArrowBack size={20} />
          </div>

          <IconBtn
            text="Add Review"
            customClasses="ml-auto text-xs sm:text-sm px-3 py-1.5"
            onclick={() => setReviewModal(true)}
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="text-base md:text-lg font-bold line-clamp-2">
            {courseEntireData?.courseName}
          </p>
          <p className="text-xs md:text-sm font-semibold text-[#585D69]">
            {completedLectures?.length} / {totalNoOfLectures} Lectures Completed
          </p>
        </div>
      </div>

      {/* Scrollable Content Container */}
      <div className="max-h-[300px] md:max-h-none md:h-[calc(100vh-8.5rem)] overflow-y-auto custom-scrollbar">
        {courseSectionData?.map((course, index) => (
          <div className="text-white border-b border-zinc-800/50 last:border-b-0" key={index}>
            
            {/* Section Header */}
            <div 
              className="flex justify-between items-center bg-zinc-800/90 hover:bg-zinc-800 px-4 py-3.5 cursor-pointer transition-colors duration-200 select-none"
              onClick={() => setActiveStatus(activeStatus === course?._id ? "" : course?._id)}
            >
              <div className="w-[85%] text-xs sm:text-sm font-semibold tracking-wide break-words pr-2">
                {course?.sectionName}
              </div>
              <div className="flex items-center justify-center shadow-sm">
                <span
                  className={`${
                    activeStatus === course?._id ? "rotate-180" : "rotate-0"
                  } transition-transform duration-300 text-zinc-400`}
                >
                  <BsChevronDown size={14} />
                </span>
              </div>
            </div>

            {/* Sub Sections List */}
            {activeStatus === course?._id && (
              <div className="bg-zinc-900/40 transition-all duration-300">
                {course?.subSection?.map((topic, i) => (
                  <div
                    className={`flex items-start gap-3 px-5 py-3 text-xs sm:text-sm border-b border-zinc-800/30 last:border-b-0 cursor-pointer transition-colors duration-200 ${
                      videoBarActive === topic._id
                        ? "bg-yellow-400 font-bold text-[#161D29]"
                        : "hover:bg-zinc-900 text-zinc-300"
                    }`}
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures?.includes(topic?._id)}
                      readOnly
                      className="mt-0.5 h-3.5 w-3.5 accent-yellow-500 rounded cursor-pointer"
                    />
                    <span className="break-all flex-1 leading-relaxed">{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;