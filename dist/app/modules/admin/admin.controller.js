"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admin_service_1 = require("./admin.service");
const getUsers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await admin_service_1.AdminService.getAllUsers();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Users retrieved successfully",
        data: result,
    });
});
const updateUserStatus = (0, catchAsync_1.default)(async (req, res) => {
    const result = await admin_service_1.AdminService.updateUserStatus(req.params.id, req.body.isBlocked);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User updated successfully",
        data: result,
    });
});
const getProperties = (0, catchAsync_1.default)(async () => {
    return admin_service_1.AdminService.getAllProperties();
});
const getRentals = (0, catchAsync_1.default)(async () => {
    return admin_service_1.AdminService.getAllRentals();
});
exports.AdminController = {
    getUsers,
    updateUserStatus,
    getProperties,
    getRentals,
};
