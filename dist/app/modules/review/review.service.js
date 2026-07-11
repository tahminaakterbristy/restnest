"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createReview = async (tenantId, payload) => {
    const completedRental = await prisma_1.default.rentalRequest.findFirst({
        where: {
            tenantId,
            propertyId: payload.propertyId,
            status: "COMPLETED",
        },
    });
    if (!completedRental) {
        throw new AppError_1.default(403, "You can review only after completing your rental.");
    }
    return prisma_1.default.review.create({
        data: {
            tenantId,
            propertyId: payload.propertyId,
            rating: payload.rating,
            comment: payload.comment,
        },
    });
};
const getReviews = async (propertyId) => {
    return prisma_1.default.review.findMany({
        where: {
            propertyId,
        },
        include: {
            tenant: true,
        },
    });
};
exports.ReviewService = {
    createReview,
    getReviews,
};
