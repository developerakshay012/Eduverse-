import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import OpenRoute from "./Components/Core/Auth/OpenRoute";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Error from "./Pages/Error";
import VerifyEmail from "./Pages/VerifyEmail";
import UpdatePassword from "./Pages/UpdatePassword";
import ForgotPassword from "./Pages/ForgotPassword";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyProfile from "./Components/Core/Dashboard/MyProfile";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import Setting from "./Components/Core/Dashboard/Setting/Setting";
import EnrolledCourses from "./Components/Core/Dashboard/EnrolledCourse";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./Utils/Constants";
import Cart from "./Components/Core/Dashboard/Cart/Cart";
import MyCourses from "./Components/Core/Dashboard/MyCourse";
import AddCourse from "./Components/Core/Dashboard/AddCourse/AddCourse";
import EditCourse from "./Components/Core/Dashboard/EditCourse/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetailsPage from "./Pages/CourseDetailsPage";
import ViewCourseDetails from './Pages/ViewCourseDetails';
import VideoDetails from "./Components/Core/ViewCourse/VideoDetails";
import Instructor from "./Components/Core/Dashboard/Instructor/Instructor";

// Sirf yeh EK baar rahega, baaki saare NavBar ke imports delete kar do
import NavBar from "./Components/Common/NavBar";

function App() {

    const {user} = useSelector((state) => state.profile);

  return (
    <>
      <div className="min-h-screen text-white">
        <NavBar />

        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/catalog/:catalogName" element={<Catalog/>} />
            <Route path="/courses/:courseId" element={<CourseDetailsPage/>} />

            <Route
              path="/login"
              element={
                <OpenRoute>
                  <Login />
                </OpenRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <OpenRoute>
                  <Signup />
                </OpenRoute>
              }
            />

            <Route
              path="forgot-password"
              element={
                <OpenRoute>
                  <ForgotPassword />
                </OpenRoute>
              }
            />

            <Route
              path="verify-email"
              element={
                <OpenRoute>
                  <VerifyEmail />
                </OpenRoute>
              }
            />

            <Route
              path="update-password/:id"
              element={
                <OpenRoute>
                  <UpdatePassword />
                </OpenRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="my-profile" element={<MyProfile />} />
               <Route path="settings" element={<Setting />} />
             
              
              {
                user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <>
                    <Route path="enrolled-courses" element ={<EnrolledCourses/>} />
                    <Route path="cart" element ={<Cart/>} />
                  </>
                )
              }




              {
                user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                  <>
                    <Route path="instructor" element={<Instructor />} />
                    <Route path="my-courses" element={<MyCourses />} />
                    <Route path="add-course" element={<AddCourse/>} />
                    <Route path="edit-course/:courseId" element={<EditCourse/>} />
                  </>
                )
              }


            </Route>

<Route
  path="view-course/:courseId"
  element={
    <PrivateRoute>
      <ViewCourseDetails />
    </PrivateRoute>
  }
>
  <Route
    path="section/:sectionId/sub-section/:subSectionId"
    element={
      user?.accountType === ACCOUNT_TYPE.STUDENT ? (
        <VideoDetails />
      ) : (
        <Navigate to="/" />
      )
    }
  />
</Route>

            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
