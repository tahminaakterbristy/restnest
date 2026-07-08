import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {

  const result = await AuthService.registerUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Registered Successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login Successful",
    data: result,
  });
});


const getMe = catchAsync(async (req, res) => {
  const user = (req as any).user;

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile Retrieved Successfully",
    data: user,
  });
});

export const AuthController = {
    register,
    login,
    getMe,
};