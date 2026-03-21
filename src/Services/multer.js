import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import multer from "multer";
import CloudinaryStorage from "multer-storage-cloudinary";

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    return {
      folder: "profile",
      format: file.mimetype.split("/")[1], // jpg/png/jpeg
      public_id: `${Date.now()}-${file.originalname}`
    };
  }
});

export const upload = multer({ storage });