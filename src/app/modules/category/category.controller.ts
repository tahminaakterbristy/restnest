import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategory(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Category Created Successfully",
    data: result,
  });
});

const getCategories = catchAsync(async (req, res) => {
  const result = await CategoryService.getCategories();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Categories Retrieved Successfully",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getCategories,
};