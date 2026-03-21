import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["employee", "employer"],
      default: "employee",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      default: null,
    },

    profile: {
      type: String,
      default: "",
    },

    appliedJobs: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Job" }
    ],

    createdJobs: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Job" }
    ],

    savedJobs: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Job" }
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;