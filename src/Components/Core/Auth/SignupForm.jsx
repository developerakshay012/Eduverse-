  import { useState } from "react"
  import { toast } from "react-hot-toast"
  import { useDispatch } from "react-redux"
  import { useNavigate } from "react-router-dom"
  import { AiFillEyeInvisible } from "react-icons/ai";
  import { IoEye } from "react-icons/io5";

  import { sendOtp } from "../../../Services/operations/authApi"
  import { setSignupData } from "../../../Slices/authSlice"
  import { ACCOUNT_TYPE } from "../../../Utils/constants"
  import Tab from "../../Common/Tab"


  function SignupForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // student or instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { firstName, lastName, email, password, confirmPassword } = formData

    // Handle input fields, when some value changes
    const handleOnChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
    }


    const handleOnSubmit = (e) => {
    e.preventDefault();

     console.log("Form Submitted"); //  

    //  Step 2: confirm password check
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    //  Step 3: proceed
    const signupData = {
      ...formData,
      accountType,
    };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

    // data to pass to Tab component
    const tabData = [
      {
        id: 1,
        tabName: "Student",
        type: ACCOUNT_TYPE.STUDENT,
      },
      {
        id: 2,
        tabName: "Instructor",
        type: ACCOUNT_TYPE.INSTRUCTOR,
      },
    ]

    return (
      <div>
        {/* Tab */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />
        {/* Form */}
        <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
          <div className="flex w-full gap-x-10">
            <label>
              <p className="mb-1 text-[0.875rem] leading-5.5 text-[#F1F2FF]">
                First Name <sup className="text-pink-600">*</sup>
              </p>
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter first name..."
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-lg bg-[#161D29] p-3 text-[#F1F2FF]"
              />
            </label>
            <label>
              <p className="mb-1 text-[0.875rem] leading-5.5 text-[#F1F2FF]">
                Last Name <sup className="text-pink-600">*</sup>
              </p>
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter last name..."
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-lg bg-[#161D29] p-3 text-[#F1F2FF]"
              />
            </label>
          </div>
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
              placeholder="Enter email address..."
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-lg bg-[#161D29] p-3 text-[#F1F2FF]"
            />
          </label>
          <div className="flex gap-x-4">
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-5.5 text-[#F1F2FF]">
                Create Password <sup className="text-pink-600">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password...."
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-lg bg-[#161D29] p-3 pr-10 text-[#F1F2FF]"
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
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-5.5 text-[#F1F2FF]">
                Confirm Password <sup className="text-pink-600">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password...."
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-lg bg-[#161D29] p-3 pr-10 text-[#F1F2FF]"
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
          </div>
          <button
            type="submit" 
            className="mt-6 rounded-lg bg-yellow-400 py-3 px-3 font-medium text-[#000814] cursor-pointer"
          >
            Create Account
          </button>

          <button onClick={() => navigate('/login')}
            className="cursor-pointer  border border-gray-500 p-2 rounded-md font-bold text-[#47A5C5]" 
            >
              Already have an account...?
          </button>
        </form>
      </div>
    )
  }

  export default SignupForm