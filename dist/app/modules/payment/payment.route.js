"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.post("/create/:rentalId", (0, auth_1.default)("TENANT"), payment_controller_1.PaymentController.createPayment);
router.post("/success", payment_controller_1.PaymentController.paymentSuccess);
router.post("/fail", payment_controller_1.PaymentController.paymentFail);
router.post("/cancel", payment_controller_1.PaymentController.paymentCancel);
router.get("/", (0, auth_1.default)("TENANT"), payment_controller_1.PaymentController.getPayments);
router.get("/:id", (0, auth_1.default)("TENANT"), payment_controller_1.PaymentController.getPaymentDetails);
exports.default = router;
