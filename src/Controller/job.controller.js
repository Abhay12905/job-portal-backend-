import { Navigate } from "react-router-dom";
import { Job } from "../Models/job.schema.js";
import User from "../Models/user.schema.js";
import { CustomError } from "../Utils/CustomError.js";

const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      jobType,
      experience,
      description,
      skills
    } = req.body;

    if (!title || !company || !description || !jobType || !experience) {
      throw new CustomError(400, "Required fields are missing");
    }

    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

    // ✅ GET IMAGE FROM CLOUDINARY
    const logoUrl = req.file ? req.file.path : "";

    const newJob = await Job.create({
      title,
      company,
      location,
      salary,
      jobType,
      experience,
      description,
      skills: skills ? skills.split(",") : [],
      logo: logoUrl, // ✅ FIXED
      createdBy: userId
    });

    user.createdJobs.push(newJob._id);
    await user.save();
    
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: newJob
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("createdBy", "name email") // optional
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      jobs: jobs // ✅ VERY IMPORTANT KEY NAME
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs"
    });
  }
};

export { createJob , getAllJobs};