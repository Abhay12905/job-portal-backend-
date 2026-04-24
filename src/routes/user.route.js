import express from "express"
import asyncHandler from "../Middleware/asyncHandler.js"
import { authCheck } from "../Middleware/authCheck.js"
import {createUser, getAllUser, loginUser , testController ,OtpVerify ,RefershToken} from "../Controller/user.controller.js"
import { roleCheck } from "../Middleware/roleCheck.js"
export const userRoutes = express.Router()

userRoutes.post("/createUser",asyncHandler(createUser))

userRoutes.get("/getallusers",asyncHandler(getAllUser))

userRoutes.post("/OtpVerify",asyncHandler(OtpVerify))

userRoutes.post("/login",asyncHandler(loginUser))

userRoutes.post("/refreshToken", asyncHandler(RefershToken))

userRoutes.post("/test",authCheck,roleCheck("employee","admin","employer"),asyncHandler(testController))

