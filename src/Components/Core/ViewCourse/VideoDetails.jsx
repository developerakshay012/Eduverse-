import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { markLectureAsComplete } from "../../../Services/Operations/courseDetailsApi"
import { updateCompletedLectures } from "../../../Slices/viewCourseSlice"
import IconBtn from "../../Common/IconBtn"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData = [], courseEntireData, completedLectures = [] } =
    useSelector((state) => state.viewCourse)

  // FIX: Initial state ko null rakha taaki jab tak data na aaye loader dikhe
  const [videoData, setVideoData] = useState(null)
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (!courseSectionData || !courseSectionData.length) return
      
      if (!courseId || !sectionId || !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
        return
      }

      const filteredSection = courseSectionData.find(
        (course) => course._id === sectionId
      )

      const filteredVideoData = filteredSection?.subSection?.find(
        (data) => data._id === subSectionId
      )

      if (filteredVideoData) {
        setVideoData(filteredVideoData)
        setPreviewSource(courseEntireData?.thumbnail || "")
        setVideoEnded(false)
      }
    })()
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId, navigate])

  // Check if first video
  const isFirstVideo = () => {
    if (!courseSectionData?.length) return false
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSection?.findIndex((data) => data._id === subSectionId)
    return currentSectionIndx === 0 && currentSubSectionIndx === 0
  }

  // Check if last video
  const isLastVideo = () => {
    if (!courseSectionData?.length) return false
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const noOfSubsections = courseSectionData[currentSectionIndx]?.subSection?.length || 0
    const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSection?.findIndex((data) => data._id === subSectionId)
    return currentSectionIndx === courseSectionData.length - 1 && currentSubSectionIndx === noOfSubsections - 1
  }

  // Go to Next Video
  const goToNextVideo = () => {
    if (!courseSectionData?.length) return
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const noOfSubsections = courseSectionData[currentSectionIndx]?.subSection?.length || 0
    const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSection?.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx + 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    } else if (currentSectionIndx !== courseSectionData.length - 1) {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId = courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  // Go to Prev Video
  const goToPrevVideo = () => {
    if (!courseSectionData?.length) return
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSection?.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx - 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    } else if (currentSectionIndx !== 0) {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength = courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId = courseSectionData[currentSectionIndx - 1].subSection[prevSubSectionLength - 1]._id
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  // Pure course me se randomly koi bhi video chalane ke liye function
  const playRandomVideo = () => {
    if (!courseSectionData?.length) return;

    const allVideos = [];
    courseSectionData.forEach((section) => {
      section.subSection.forEach((sub) => {
        allVideos.push({
          secId: section._id,
          subSecId: sub._id,
        });
      });
    });

    if (allVideos.length <= 1) return;

    // Jo chal rhi h use filter out kiya taaki repetitive na ho
    const otherVideos = allVideos.filter(v => v.subSecId !== subSectionId);
    
    const randomIndex = Math.floor(Math.random() * otherVideos.length);
    const randomVideo = otherVideos[randomIndex];

    navigate(`/view-course/${courseId}/section/${randomVideo.secId}/sub-section/${randomVideo.subSecId}`);
  }

 const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      // FIX 2: Key ka naam badalkar subSectionId kiya taaki backend se exact match ho
      { courseId: courseId, subSectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
}

  return (
    <div className="flex flex-col gap-5 text-white mt-10">
      {!videoData ? (
        <div className="aspect-video w-full flex items-center justify-center bg-zinc-900 rounded-md">
          {previewSource ? (
            <img src={previewSource} alt="Preview" className="h-full w-full rounded-md object-cover" />
          ) : (
            <p className="text-xl text-zinc-400">Loading Video Details...</p>
          )}
        </div>
      ) : (
        /* Native HTML5 Video Wrapper */
        <div className="relative aspect-video w-full overflow-hidden rounded-md border border-zinc-800 bg-black">
          <video
            ref={playerRef}
            src={videoData?.videoUrl}
            controls={!videoEnded} // End hone par custom menu overlay dikhane ke liye controls hide ho jayenge
            className="w-full h-full object-contain"
            onEnded={() => setVideoEnded(true)}
            playsInline
            // key dependency use ki taaki source change hone par naya video reload ho jaye natively
            key={videoData?.videoUrl} 
          />
          
          {/* Custom Overlay jb Video Khatam ho jaye */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.8), rgba(0,0,0,0.6))",
              }}
              className="absolute inset-0 z-[50] grid h-full place-content-center font-inter bg-black bg-opacity-60"
            >
              {!completedLectures?.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={handleLectureCompletion}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto mb-2"
                />
              )}
              <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    playerRef.current.currentTime = 0; // Native Rewatch state reset
                    playerRef.current.play();
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto"
              />
              
              {/* Dashboard Navigation Buttons */}
              <div className="mt-8 flex min-w-[250px] justify-center items-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button disabled={loading} onClick={goToPrevVideo} className="bg-zinc-800 text-white px-4 py-2 rounded hover:scale-95 transition-all text-sm font-semibold">
                    Prev
                  </button>
                )}
                
                {/* RANDOM BUTTON */}
                <button disabled={loading} onClick={playRandomVideo} className="bg-purple-600 text-white px-4 py-2 rounded hover:scale-95 hover:bg-purple-700 transition-all text-sm font-semibold">
                  🎲 Random
                </button>

                {!isLastVideo() && (
                  <button disabled={loading} onClick={goToNextVideo} className="bg-yellow-100 text-black px-4 py-2 rounded hover:scale-95 transition-all text-sm font-semibold">
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6 text-zinc-400 leading-relaxed">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails