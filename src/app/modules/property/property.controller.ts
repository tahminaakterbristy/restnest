import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PropertyService } from "./property.service";

const createProperty = catchAsync(async (req, res) => {
  const result = await PropertyService.createProperty(
    req.body,
    (req as any).user.id
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Property created successfully",
    data: result,
  });
});

const getProperties = catchAsync(async (req, res) => {
  const result = await PropertyService.getProperties();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Properties retrieved successfully",
    data: result,
  });
});

const getSingleProperty = catchAsync(async (req, res) => {
  const result = await PropertyService.getSingleProperty(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property retrieved successfully",
    data: result,
  });
});

const updateProperty = catchAsync(async (req, res) => {
  const result = await PropertyService.updateProperty(
    req.params.id,
    req.body,
    (req as any).user.id
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property updated successfully",
    data: result,
  });
});

const deleteProperty = catchAsync(async (req, res) => {
  await PropertyService.deleteProperty(
    req.params.id,
    (req as any).user.id
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property deleted successfully",
    data: null,
  });
});

export const PropertyController = {
  createProperty,
  getProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
};