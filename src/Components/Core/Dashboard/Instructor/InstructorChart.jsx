import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students")

  // 1. Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        data: courses?.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses?.length || 0),
      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        data: courses?.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses?.length || 0),
      },
    ],
  }

  // 2. Options configuration with proper layouts to prevent cropping
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#939bb4", // Text visibility settings
          boxWidth: 12,
          font: {
            size: 11,
          },
        },
      },
    },
    layout: {
      padding: {
        top: 5,
        bottom: 15, // 👈 Is bottom padding se niche ka circular part screen se kabhi nahi katega
        left: 5,
        right: 5,
      },
    },
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6 h-full w-full">
      <p className="text-lg font-bold text-gray-100">Visualize</p>
      
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 cursor-pointer ${
            currChart === "students"
              ? "bg-[#2C333F] text-[#FFD166]"
              : "text-[#9E8006]"
          }`}
        >
          Students
        </button>
        
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 cursor-pointer ${
            currChart === "income"
              ? "bg-[#2C333F] text-[#FFD60A]"
              : "text-[#9E8006]"
          }`}
        >
          Income
        </button>
      </div>

      {/* 3. 👈 Sahi Height Controlled Container Box */}
      <div className="relative mx-auto h-[390px] md:h-[310px] w-full flex items-center justify-center">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart; 