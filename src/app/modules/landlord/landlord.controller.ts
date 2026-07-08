import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LandlordService } from "./landlord.service";

const getMyProperties = catchAsync(async (req, res) => {
  const result = await LandlordService.getMyProperties(
    (req as any).user.id
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Properties retrieved successfully",
    data: result,
  });
});

const getRentalRequests = catchAsync(async (req, res) => {
  const result = await LandlordService.getRentalRequests(
    (req as any).user.id
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental requests retrieved successfully",
    data: result,
  });
});

const updateRentalStatus = catchAsync(async (req, res) => {
  const result = await LandlordService.updateRentalStatus(
    req.params.id,
    req.body.status
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental status updated successfully",
    data: result,
  });
});

const updateAvailability = catchAsync(async (req, res) => {
  const result = await LandlordService.updateAvailability(
    req.params.id,
    req.body.isAvailable
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Availability updated successfully",
    data: result,
  });
});

export const LandlordController = {
  getMyProperties,
  getRentalRequests,
  updateRentalStatus,
  updateAvailability,
};