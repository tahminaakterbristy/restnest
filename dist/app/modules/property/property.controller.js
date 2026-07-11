"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const property_service_1 = require("./property.service");
const createProperty = (0, catchAsync_1.default)(async (req, res) => {
    const result = await property_service_1.PropertyService.createProperty(req.body, req.user.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Property created successfully",
        data: result,
    });
});
const getProperties = (0, catchAsync_1.default)(async (req, res) => {
    const result = await property_service_1.PropertyService.getProperties(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Properties retrieved successfully",
        data: result,
    });
});
const getSingleProperty = (0, catchAsync_1.default)(async (req, res) => {
    const result = await property_service_1.PropertyService.getSingleProperty(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Property retrieved successfully",
        data: result,
    });
});
const updateProperty = (0, catchAsync_1.default)(async (req, res) => {
    const result = await property_service_1.PropertyService.updateProperty(req.params.id, req.body, req.user.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Property updated successfully",
        data: result,
    });
});
const deleteProperty = (0, catchAsync_1.default)(async (req, res) => {
    await property_service_1.PropertyService.deleteProperty(req.params.id, req.user.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Property deleted successfully",
        data: null,
    });
});
exports.PropertyController = {
    createProperty,
    getProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty,
};
