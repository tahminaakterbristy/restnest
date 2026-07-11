"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const createRentalRequest = async (tenantId, payload) => {
    return prisma_1.default.rentalRequest.create({
        data: {
            tenantId,
            propertyId: payload.propertyId,
            moveInDate: new Date(payload.moveInDate),
            status: "PENDING",
        },
        include: {
            tenant: true,
            property: true,
        },
    });
};
const getRentalRequests = async () => {
    return prisma_1.default.rentalRequest.findMany({
        include: {
            tenant: true,
            property: true,
        },
    });
};
const updateRentalStatus = async (id, status) => {
    return prisma_1.default.rentalRequest.update({
        where: { id },
        data: { status },
    });
};
exports.RentalService = {
    createRentalRequest,
    getRentalRequests,
    updateRentalStatus,
};
