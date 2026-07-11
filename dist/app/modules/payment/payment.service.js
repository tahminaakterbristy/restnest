"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const uuid_1 = require("uuid");
const prisma_1 = __importDefault(require("../../config/prisma"));
const payment_utils_1 = require("./payment.utils");
const createPayment = async (rentalRequestId) => {
    const rental = await prisma_1.default.rentalRequest.findUnique({
        where: {
            id: rentalRequestId
        },
        include: {
            property: true,
            tenant: true
        }
    });
    if (!rental) {
        throw new Error("Rental Request Not Found");
    }
    if (rental.status !== "APPROVED") {
        throw new Error("Rental Request Not Approved");
    }
    const transactionId = (0, uuid_1.v4)();
    await prisma_1.default.payment.create({
        data: {
            rentalRequestId,
            transactionId,
            provider: "SSLCommerz",
            amount: rental.property.rent
        }
    });
    const data = {
        total_amount: rental.property.rent,
        currency: "BDT",
        tran_id: transactionId,
        success_url: process.env.SUCCESS_URL,
        fail_url: process.env.FAIL_URL,
        cancel_url: process.env.CANCEL_URL,
        ipn_url: "",
        shipping_method: "NO",
        product_name: rental.property.title,
        product_category: "Rent",
        product_profile: "general",
        cus_name: rental.tenant.name,
        cus_email: rental.tenant.email,
        cus_add1: "Dhaka",
        cus_city: "Dhaka",
        cus_country: "Bangladesh",
        cus_phone: "01700000000"
    };
    const response = await payment_utils_1.sslcz.init(data);
    return response.GatewayPageURL;
};
const paymentSuccess = async (tranId) => {
    const payment = await prisma_1.default.payment.update({
        where: {
            transactionId: tranId,
        },
        data: {
            paymentStatus: "PAID",
            paidAt: new Date(),
        },
    });
    await prisma_1.default.rentalRequest.update({
        where: {
            id: payment.rentalRequestId,
        },
        data: {
            status: "ACTIVE",
        },
    });
    return payment;
};
const paymentFail = async (tranId) => {
    return prisma_1.default.payment.update({
        where: {
            transactionId: tranId,
        },
        data: {
            paymentStatus: "FAILED",
        },
    });
};
const paymentCancel = async (tranId) => {
    return prisma_1.default.payment.update({
        where: {
            transactionId: tranId,
        },
        data: {
            paymentStatus: "FAILED",
        },
    });
};
const getMyPayments = async (tenantId) => {
    return prisma_1.default.payment.findMany({
        where: {
            rentalRequest: {
                tenantId,
            },
        },
        include: {
            rentalRequest: {
                include: {
                    property: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getPaymentDetails = async (id) => {
    return prisma_1.default.payment.findUnique({
        where: {
            id,
        },
        include: {
            rentalRequest: {
                include: {
                    property: true,
                },
            },
        },
    });
};
exports.PaymentService = {
    createPayment,
    paymentSuccess,
    paymentFail,
    paymentCancel,
    getMyPayments,
    getPaymentDetails
};
