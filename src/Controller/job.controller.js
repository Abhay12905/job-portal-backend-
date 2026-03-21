import { Job } from "../Models/job.schema.js";
import User from "../Models/user.schema.js";
import { CustomError } from "../Utils/CustomError.js";

const createJob = async (req, res) => {
  const {
    title,
    company,
    location,
    salary,
    jobType,
    experience,
    description,
    skills,
    logo } = req.body;

  if (!title || !company || !description || !jobType || !experience) {
    throw new CustomError(400, "Required fields are missing");
  }

  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError(404, "User not found");
  }

  const newJob = await Job.create({
    title,
    company,
    location,
    salary,
    jobType,
    experience,
    description,
    skills: skills ? skills.split(",") : [],
    logo,
    createdBy: userId
  });

  user.createdJobs.push(newJob._id);
  await user.save();

  res.status(201).json({
    success: true,
    message: "Job created successfully",
    data: newJob
  });
};

export { createJob };