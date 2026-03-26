import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user.route.js";
import dbConnect from "./Database/dbConnect.js";
import {upload} from "./Services/multer.js"
import { jobRoute } from "./routes/jobs.route.js";

dotenv.config();

const app = express();

dbConnect();

const PORT = process.env.PORT || 3000;

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  exposedHeaders: ["Authorization"]
}));


// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRouter);

app.use("/api/job", jobRoute);

app.post("/api/upload", upload.single("file"), (req, res)=>{
  console.log("FILE:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file received" });
  }

  res.json({
    message: "File uploaded successfully",
    url: req.file.path   // 🔥 important
  });
});


// Error Handler
app.use((err, req, res, next) => {

  console.log("Error:", err.message);

  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal Server Error"
  });

});

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT : ${PORT}`);
});