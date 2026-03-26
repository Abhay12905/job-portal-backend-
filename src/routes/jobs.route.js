import express from "express";
import asyncHandler from "../Middleware/asyncHandler.js";
import { authCheck } from "../Middleware/authCheck.js";
import { roleCheck } from "../Middleware/roleCheck.js";
import { createJob , getAllJobs } from "../Controller/job.controller.js";
import { upload } from "../Services/multer.js"

export const jobRoute = express.Router();

jobRoute.post(
  "/create",
  authCheck,
  roleCheck("employer","admin"),upload.single("logo"),
  asyncHandler(createJob)
);

jobRoute.get("/getAll", getAllJobs);