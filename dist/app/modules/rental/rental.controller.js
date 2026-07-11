"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const rental_service_1 = require("./rental.service");
const createRentalRequest = (0, catchAsync_1.default)(async (req, res) => {
    const result = await rental_service_1.RentalService.createRentalRequest(req.user.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Rental request created successfully",
        data: result,
    });
});
const getRentalRequests = (0, catchAsync_1.default)(async (req, res) => {
    const result = await rental_service_1.RentalService.getRentalRequests();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Rental requests retrieved successfully",
        data: result,
    });
});
const updateRentalStatus = (0, catchAsync_1.default)(async (req, res) => {
    const result = await rental_service_1.RentalService.updateRentalStatus(req.params.id, req.body.status);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Rental status updated successfully",
        data: result,
    });
});
exports.RentalController = {
    createRentalRequest,
    getRentalRequests,
    updateRentalStatus,
};
