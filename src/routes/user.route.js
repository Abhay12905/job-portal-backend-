import express from "express"
import asyncHandler from "../Middleware/asyncHandler.js"
import { authCheck } from "../Middleware/authCheck.js"
import {createUser, getAllUser , deleteuser ,updateUser , loginUser , testController ,OtpVerify ,RefershToken} from "../Controller/user.controller.js"
import { roleCheck } from "../Middleware/roleCheck.js"
export const userRouter = express.Router()

userRouter.post("/createUser",asyncHandler(createUser))

userRouter.get("/getallusers",asyncHandler(getAllUser))

// userRouter.delete("/deleteuser/:id",asyncHandler(deleteuser))

// userRouter.patch("/updateUser/:id",asyncHandler(updateUser))

userRouter.post("/OtpVerify",asyncHandler(OtpVerify))

userRouter.post("/login",asyncHandler(loginUser))

userRouter.post("/refreshToken", asyncHandler(RefershToken))

userRouter.post("/test",authCheck,roleCheck("employee","admin"),asyncHandler(testController))

