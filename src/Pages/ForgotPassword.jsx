import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { TiArrowBackOutline } from "react-icons/ti";
import { getPasswordResetToken } from "../Services/Operations/authAPI"
import { AiOutlineHistory } from "react-icons/ai";


function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    console.log("forget password");
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="grid min-h-[90vh] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-125 p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-bold leading-9.5 text-yellow-400">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="my-4 text-[17px] leading-6.5 text-[#AFB2BF]">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-5.5 text-[#9da0ca]">
                  Email Address <sup className="text-pink-600">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address...."
                  className="form-style w-full p-3 rounded-md border-gray-700  border-[3px] bg-[#161D29]"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-yellow-400 py-3 px-3 font-medium text-[#000814] cursor-pointer"
            >
              {!emailSent ? "Sumbit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-[#71b4e7]">
                <TiArrowBackOutline /> Back To Login  <AiOutlineHistory/>
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword