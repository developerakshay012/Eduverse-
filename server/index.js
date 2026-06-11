  import dotenv from "dotenv";
  dotenv.config();

  import express from "express";
  import cookieParser from "cookie-parser";
  import cors from "cors";
  import fileUpload from "express-fileupload";

  import connectDataBase from "./config/database.js";
  import cloudinaryConnect from "./config/cloudinary.js";

  // Routes
  import authRouter from "./routes/User.js";
  import proRouter from "./routes/Profile.js";
  import courseRouter from "./routes/Course.js";
  import conRouter from "./routes/ContactUs.js";
  import payRouter from "./routes/Payments.js";

  const app = express();

  const PORT = process.env.PORT || 4000;

  // DB + Cloudinary
  connectDataBase();
  cloudinaryConnect();

  // Middlewares
  app.use(express.json());
  app.use(cookieParser());

  // CORS
  const whitelist = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : ["*"];



  app.use(cors({
    origin: "https://eduverse-v1st.vercel.app",
    credentials: true
  }))



  // File upload
  app.use(
      fileUpload({
          useTempFiles: true,
          tempFileDir: "/tmp/",
      })
  );

  // Routes
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/profile", proRouter);
  app.use("/api/v1/course", courseRouter);
  app.use("/api/v1/contactus", conRouter);
  app.use("/api/v1/payment", payRouter);

  // Test route
  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is running..."
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });