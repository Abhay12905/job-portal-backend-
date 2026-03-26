import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import  {CloudinaryStorage}  from "multer-storage-cloudinary";
import dotenv from "dotenv"



dotenv.config({
  path : "../../.env"
})

// console.log(process.env.CLOUD_NAME)

cloudinary.config({
  cloud_name: "dfuvyvhal",
  api_key: "895576941282426",
  api_secret: "jy2I47Uk_sLyAmpB4GS5lNp5nKg",
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    console.log("running");
    return {
      folder: "profile",
      format: file.mimetype.split("/")[1],
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

