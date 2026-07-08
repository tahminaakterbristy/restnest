import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const getUsers = catchAsync(async (req, res) => {
  const result = await AdminService.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrieved successfully",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const result = await AdminService.updateUserStatus(
    req.params.id,
    req.body.isBlocked
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User updated successfully",
    data: result,
  });
});

const getProperties = catchAsync(async () => {
  return AdminService.getAllProperties();
});

const getRentals = catchAsync(async () => {
  return AdminService.getAllRentals();
});

export const AdminController = {
  getUsers,
  updateUserStatus,
  getProperties,
  getRentals,
};