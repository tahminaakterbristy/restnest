import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewService.createReview(
    (req as any).user.id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review added successfully",
    data: result,
  });
});

const getReviews = catchAsync(async (req, res) => {
  const result = await ReviewService.getReviews(req.params.propertyId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reviews fetched successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getReviews,
};