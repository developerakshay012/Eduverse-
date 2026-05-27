import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { TiArrowBack } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoEye } from "react-icons/io5";

import { resetPassword } from "../Services/Operations/authApi"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
    
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center mt-15">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-125 p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-bold leading-9.5 text-yellow-400">
            Choose new password
          </h1>
          <p className="my-4 text-[16px]  text-[#b9bcc6]">
          Almost done! Enter your new password and you’re all set. Once updated, you’ll be able to securely access your account again. Make sure to choose a strong password to keep your account safe.
          </p>
          <form onSubmit={handleOnSubmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-5.5 text-[#b9bcc6]">
                New Password <sup className="text-pink-600">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password..."
                className=" w-full p-3.5 rounded-md border-2 border-gray-600 bg-[#161D29]"
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
            </label>
            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-5.5 text-[#b9bcc6]">
                Confirm New Password <sup className="text-pink-600">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="w-full p-3.5 rounded-md border-2 border-gray-600 bg-[#161D29]"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-9.5 z-10 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiFillEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <IoEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-yellow-400 py-3 px-3 font-bold text-[#000814] cursor-pointer"
            >
              Reset Password
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-[#47A5C5]">
                <TiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword