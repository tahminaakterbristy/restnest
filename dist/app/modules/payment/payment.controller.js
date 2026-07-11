"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const payment_service_1 = require("./payment.service");
const createPayment = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentService.createPayment(req.params.rentalId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Payment Session Created",
        data: result
    });
});
const paymentSuccess = (0, catchAsync_1.default)(async (req, res) => {
    await payment_service_1.PaymentService.paymentSuccess(req.body.tran_id);
    res.redirect("http://localhost:3000/payment-success");
});
const paymentFail = (0, catchAsync_1.default)(async (req, res) => {
    await payment_service_1.PaymentService.paymentFail(req.body.tran_id);
    res.redirect("http://localhost:3000/payment-failed");
});
const paymentCancel = (0, catchAsync_1.default)(async (req, res) => {
    await payment_service_1.PaymentService.paymentCancel(req.body.tran_id);
    res.redirect("http://localhost:3000/payment-cancel");
});
const getPayments = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentService.getMyPayments(req.user.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Payment history retrieved successfully",
        data: result,
    });
});
const getPaymentDetails = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentService.getPaymentDetails(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Payment details retrieved successfully",
        data: result,
    });
});
exports.PaymentController = {
    createPayment,
    paymentSuccess,
    paymentFail,
    paymentCancel,
    getPayments,
    getPaymentDetails
};
