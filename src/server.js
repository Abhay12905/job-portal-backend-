import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user.route.js";
import dbConnect from "./Database/dbConnect.js";
import { upload } from "./Services/multer.js";
import { jobRoute } from "./routes/jobs.route.js";

dotenv.config();
const app = express();
dbConnect();

const PORT = process.env.PORT || 3000;

// ✅ FIXED CORS CONFIGURATION
const allowedOrigins = [
  "https://job-portal-frontend-x88k.vercel.app", // Your Vercel Frontend
  "http://localhost:5173"                       // Local Development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy: This origin is not allowed'), false);
    }
    return callback(null, true);
  },
  credentials: true, // Required for cookies and authorization headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Routes
app.use("/api/user", userRouter);
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