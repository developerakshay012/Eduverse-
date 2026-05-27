import loginImg from "../assets/Images/login.png"
import Template from "../Components/Core/Auth/Template"

function Login() {
  return (
    <Template
    title="📚 Learn Without Limits"
description1="Access interactive courses anytime, anywhere."
description2="Upgrade your skills and stay ahead in the digital world."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login