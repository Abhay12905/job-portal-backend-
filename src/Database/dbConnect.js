import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected successfully");
  } catch (error) {
    console.log("DB error:", error);
  }
};

export default dbConnect;