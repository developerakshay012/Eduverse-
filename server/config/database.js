import mongoose from "mongoose";
import dotenv from 'dotenv';

const connectDataBase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
    
    });

    console.log(`Database Connected Successfully...`);
  } catch (error) {
    console.error("Database Connection Failed ***");
    console.error(error.message);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDataBase
