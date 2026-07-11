"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandlordController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const landlord_service_1 = require("./landlord.service");
const getMyProperties = (0, catchAsync_1.default)(async (req, res) => {
    const result = await landlord_service_1.LandlordService.getMyProperties(req.user.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Properties retrieved successfully",
        data: result,
    });
});
const getRentalRequests = (0, catchAsync_1.default)(async (req, res) => {
    const result = await landlord_service_1.LandlordService.getRentalRequests(req.user.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Rental requests retrieved successfully",
        data: result,
    });
});
const updateRentalStatus = (0, catchAsync_1.default)(async (req, res) => {
    const result = await landlord_service_1.LandlordService.updateRentalStatus(req.params.id, req.body.status);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Rental status updated successfully",
        data: result,
    });
});
const updateAvailability = (0, catchAsync_1.default)(async (req, res) => {
    const result = await landlord_service_1.LandlordService.updateAvailability(req.params.id, req.body.isAvailable);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Availability updated successfully",
        data: result,
    });
});
const getDashboardStats = (0, catchAsync_1.default)(async (req, res) => {
    const result = await landlord_service_1.LandlordService.getDashboardStats(req.user.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Landlord dashboard retrieved successfully",
        data: result,
    });
});
exports.LandlordController = {
    getMyProperties,
    getRentalRequests,
    updateRentalStatus,
    updateAvailability,
    getDashboardStats,
};
