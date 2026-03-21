import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
    },

    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Remote"],
      required: true,
    },

    experience: {
      type: String,
    },

    description: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    logo: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);