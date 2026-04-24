import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/user.route.js";
import dbConnect from "./Database/dbConnect.js";
import { upload } from "./Services/multer.js";
import { jobRoute } from "./routes/jobs.route.js";

dotenv.config();
const app = express();
dbConnect();

const PORT = process.env.PORT || 3000;

// ✅ FIXED CORS CONFIGURATION
app.use(cors({
  origin: [
    "https://job-portal-frontend-two-livid.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/job", jobRoute);

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file received" });
  res.json({ message: "File uploaded successfully", url: req.file.path });
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