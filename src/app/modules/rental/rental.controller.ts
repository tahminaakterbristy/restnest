import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentalService } from "./rental.service";

const createRentalRequest = catchAsync(async (req, res) => {
  const result = await RentalService.createRentalRequest(
    (req as any).user.id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Rental request created successfully",
    data: result,
  });
});

const getRentalRequests = catchAsync(async (req, res) => {
  const result = await RentalService.getRentalRequests();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental requests retrieved successfully",
    data: result,
  });
});

const updateRentalStatus = catchAsync(async (req, res) => {
  const result = await RentalService.updateRentalStatus(
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

export const RentalController = {
  createRentalRequest,
  getRentalRequests,
  updateRentalStatus,
};