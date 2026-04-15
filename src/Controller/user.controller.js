import User from "../Models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "../Utils/CustomError.js";
import sendEmail from "../Services/emailService.js";
import { otptemplate } from "../Template/Otptemplate.js";
import { successhandler } from "../Utils/success.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password || !phone || !role) {
      throw new CustomError(400, "All fields are required");
    }

    // Fix enum case issue
    const formattedRole =
      role === "employee" ? "employee" : "employer";

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw new CustomError(409, "Email already exists");
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      throw new CustomError(409, "Phone number already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: formattedRole,
      otp: OTP,
    });

    await sendEmail(
      email,
      "OTP Verification",
      otptemplate.replace("{otp}", OTP)
    );
    
    successhandler(res,201,"success","success","User registered successfully. Please verify OTP ")

  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// getalluser
const getAllUser = async(req,res) => {
    try{
        const getusers = await User.find();
        res.json({getusers})
    }catch(error){
       res.json({message:"cannot fetch user" })
    }
}

// Delete
const deleteuser = async (req, res) => {
try{

  const { id } = req.params;
  
  if(!id) {
    return res.status(404).json({ message: "User id is requried " });
  }
  const dltuser = await User.findByIdAndDelete(id);
  
  res.json({dltuser});
}catch(error){
  res.status(500).json({error})
}

  } 

//   update api
const updateUser = async(req,res)=>{
  try{

    const {id} = req.params;
    const {name,email,password,phone} = req.body;
    
    const updateduser = await User.findByIdAndUpdate(id,{
      name,
      email,
      password,
      phone
    })
    res.json({message:"user detail updated successfully"})
  }catch(error){
    res.json(error)
  }
}

//OTP verify

const OtpVerify = async (req, res) => {
  const { email, OTP } = req.body;

  if (!email || !OTP) {
    throw new CustomError(400, "Email or OTP not found");
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new CustomError(404, "Email does not exist");
  }

  // console.log("DB OTP:", existingUser.otp);
  // console.log("Entered OTP:", OTP);

  if (String(existingUser.otp) !== String(OTP)) {
    throw new CustomError(400, "OTP is wrong");
  }

  existingUser.otp = null;
  existingUser.isVerified = true;

  await existingUser.save();

  successhandler(res,200,"success","success","OTP Verified Successfully ")

};

// Login User

const loginUser = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const payload = {
    id: user._id,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, "abh", { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, "def", { expiresIn: "1h" });

  console.log(accessToken)
  // ✅ store refresh token in cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000
  });

  // ✅ send access token in header
  res.setHeader("Authorization", `Bearer ${accessToken}`);

  return res.status(200).json({
    message: "Login Successful"
  });
};

// 
const RefershToken = async (req, res) => {  

  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No Refresh Token" });
  }

  try {
    const decoded = jwt.verify(token, "def");

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      "abh",
      { expiresIn: "15m" }
    );
    console.log(newAccessToken)
    res.setHeader("Authorization", `Bearer ${newAccessToken}`);

    return res.json({ message: "New Access Token" });

  } catch (err) {

    res.clearCookie("refreshToken");

    return res.status(401).json({
      message: "Refresh Token Expired"
    });
  }
};

// 
const testController = async(req,res)=>{
  console.log(req.user)
  res.send("you are Authenticated")
}

// 
const fileuploadcontroller = async(req,res)=>{
  const {userid} = req.params

  if(!userid){
    throw new CustomError(400,"UserID not found")
  }
  const existinguser = await user.findById(userid)

  if(!existinguser){
    throw new CustomError(404,"user not found")
  }
  const filetype = req.file.mimetype.split("/")[1]
  const fileformat = ["png","jpeg","jpg","jfif"]

  if(!fileformat.include(filetype)){
     existinguser.resume = req.file.path;
    
  
    }

}


export {createUser, getAllUser , deleteuser , updateUser , loginUser , testController ,OtpVerify, RefershToken};
 