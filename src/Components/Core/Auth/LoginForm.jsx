import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoEye } from "react-icons/io5";

import { login } from "../../../Services/Operations/authAPI"


function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4 "
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-5.5 text-[#F1F2FF]">
          Email Address <sup className="text-pink-600">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-lg bg-[#161D29]  p-3 text-[#F1F2FF] "
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-5.5 text-[#F1F2FF]">
          Password <sup className="text-pink-600">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-lg bg-[#161D29] p-3 pr-12 text-[#F1F2FF] "
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-9.5 z-10 cursor-pointer"
        >
          {showPassword ? (
            <AiFillEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <IoEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
       <Link
         to="/forgot-password"
        className="mt-1 max-w-auto flex ml-auto text-xs text-[#47A5C5] w-fit"
          >
          Forgot Password
          </Link>
      </label>
      <button 
        type="submit"
        className="mt-6 rounded-lg bg-yellow-400 py-3 px-3 text-[#000814] font-bold cursor-pointer"
      >
        Logged In
      </button>

          <button onClick={() => navigate('/signup')}
            className="cursor-pointer  border border-gray-500 p-2 rounded-md font-bold text-[#47A5C5]" 
            >
              Dont have an account....?
          
          </button>

    </form>
  )
}

export default LoginForm