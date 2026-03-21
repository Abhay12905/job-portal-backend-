import express from "express";
import asyncHandler from "../Middleware/asyncHandler.js";
import { authCheck } from "../Middleware/authCheck.js";
import { roleCheck } from "../Middleware/roleCheck.js";
import { createJob } from "../Controller/job.controller.js";

export const jobRoute = express.Router();

jobRoute.post(
  "/create",
  authCheck,
  roleCheck("employer"),
  asyncHandler(createJob)
);