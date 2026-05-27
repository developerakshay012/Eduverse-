import signupImg from "../assets/Images/signup.png"
import Template from "../Components/Core/Auth/Template"


function Signup() {
  return (
    <Template
    title="🌟 Learn Coding And Build Your Future"
description1="Gain real-world skills with interactive online courses."
description2="Education designed to help you succeed in the digital age."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup