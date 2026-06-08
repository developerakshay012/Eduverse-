EduVerse Learning Platform
About This Project
EduVerse is a modern full-stack EdTech platform developed to provide an interactive and efficient online
learning experience for students and instructors. The platform allows instructors to create and manage
courses, while students can explore, purchase, and learn from high-quality video content anytime and
anywhere.
The main objective of this project is to build a scalable and user-friendly learning management system
that simplifies online education through secure authentication, digital course management, payment
integration, and progress tracking features.
EduVerse is designed using the MERN Stack architecture, ensuring fast performance, scalability, and
maintainability.
Frontend Technologies
• 
• 
• 
• 
React.js
Vite
Tailwind CSS
Redux Toolkit
Backend Technologies
• 
• 
• 
• 
Node.js
Express.js
MongoDB
Mongoose
The platform also integrates Razorpay payment gateway for secure online payments and Cloudinary for
media storage and thumbnail management.
JWT authentication and role-based authorization are implemented to ensure security and proper access
control for students, instructors, and administrators.
This project demonstrates complete full-stack web development concepts including:
• 
• 
• 
• 
• 
• 
• 
• 
• 
Authentication & Authorization
REST API Development
Database Management
State Management using Redux Toolkit
Payment Gateway Integration
Cloud Media Handling
Responsive UI Design
Course & Video Management
Learning Progress Tracking
1
EduVerse can be used by educational institutions, coaching centers, instructors, and independent
educators to provide online learning services efficiently.
Features
Student Features
• 
• 
• 
• 
• 
• 
• 
• 
User Registration & Login
Browse Courses
Purchase Courses
Razorpay Payment Integration
Watch Video Lectures
Track Learning Progress
Edit Profile
View Enrolled Courses
Instructor Features
• 
• 
• 
• 
• 
• 
Create Courses
Upload Course Content
Add Sections & Subsections
Upload Course Thumbnails
Manage Students
Course Analytics
Admin Features
• 
• 
• 
• 
Manage Users
Manage Courses
Manage Categories
Platform Monitoring
Tech Stack
Technology
React.js
Purpose
Frontend UI
Vite
Build Tool
Tailwind CSS
Styling
Redux Toolkit
State Management
Node.js
Backend Runtime
Express.js
Backend Framework
2
Technology
Purpose
MongoDB
Database
Mongoose
ODM
JWT
Authentication
Razorpay
Payment Gateway
Cloudinary
Media Storage
bcrypt
Password Encryption
Project Folder Structure
EduVerse/
│
├── client/
│
├── public/
│
│
│
│
│
│
│
│
│
│
│
├── src/
│
│
│
│
│
│
│
│
├── assets/
├── components/
├── pages/
├── redux/
├── services/
├── utils/
├── App.jsx
└── main.jsx
├── package.json
└── vite.config.js
│
├── server/
│
├── config/
│
│
│
│
│
│
│
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── index.js
└── package.json
│
├── README.md
└── .env
3
Complete Code Flow
1. Authentication Flow
User Signup/Login
↓
Frontend Sends API Request
↓
Backend Validates User
↓
Password Encrypted using bcrypt
↓
JWT Token Generated
↓
Token Sent to Frontend
↓
User Authenticated
2. Course Purchase Flow
Student Selects Course
↓
Frontend Sends Purchase Request
↓
Backend Creates Razorpay Order
↓
Razorpay Payment Window Opens
↓
Payment Successful
↓
Backend Verifies Payment
↓
Student Enrolled in Course
3. Course Creation Flow
Instructor Creates Course
↓
Course Data Sent to Backend
↓
Thumbnail Uploaded to Cloudinary
↓
4
Course Saved in MongoDB
↓
Instructor Adds Videos & Sections
↓
Course Published
4. Video Learning Flow
Student Opens Course
↓
Frontend Fetches Course Details
↓
Video Player Loads Lecture
↓
Student Watches Video
↓
Lecture Marked as Completed
↓
Progress Updated
Backend Architecture
Controllers
• 
• 
• 
• 
authController.js
courseController.js
paymentController.js
profileController.js
Routes
/api/v1/auth
/api/v1/course
/api/v1/payment
/api/v1/profile
Middleware
• 
• 
• 
• 
Authentication Middleware
Authorization Middleware
Token Verification
File Upload Middleware
5
Frontend Architecture
Components
• 
• 
• 
• 
• 
Navbar
Footer
CourseCard
VideoPlayer
DashboardSidebar
Pages
• 
• 
• 
• 
• 
Home Page
Login Page
Signup Page
Dashboard
Course Details Page
Redux Store
• 
• 
• 
• 
• 
authSlice
profileSlice
cartSlice
courseSlice
viewCourseSlice
Environment Variables
Frontend (.env)
VITE_BASE_URL=
VITE_RAZORPAY_KEY=
Backend (.env)
PORT=
MONGODB_URL=
JWT_SECRET=
MAIL_HOST=
MAIL_USER=
MAIL_PASS=
RAZORPAY_KEY=
RAZORPAY_SECRET=
CLOUDINARY_NAME=
6
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
Installation Guide
Clone Repository
git clone <repository-url>
Frontend Setup
cd client
npm install
npm run dev
Backend Setup
cd server
npm install
npm run dev
Important Packages Used
Frontend
react
react-router-dom
redux-toolkit
axios
react-hot-toast
react-player
Backend
express
mongoose
jsonwebtoken
bcrypt
7
cors
nodemailer
razorpay
cloudinary
Conclusion
EduVerse is a complete MERN stack EdTech platform that provides secure authentication, course
management, payment integration, and video-based learning features. The project demonstrates
strong frontend and backend development concepts along with real-world application architecture used
in modern web applications