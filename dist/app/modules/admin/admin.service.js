"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const getAllUsers = async () => {
    return prisma_1.default.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
const updateUserStatus = async (id, isBlocked) => {
    return prisma_1.default.user.update({
        where: { id },
        data: {
            isBlocked,
        },
    });
};
const getAllProperties = async () => {
    return prisma_1.default.property.findMany({
        include: {
            landlord: true,
            category: true,
        },
    });
};
const getAllRentals = async () => {
    return prisma_1.default.rentalRequest.findMany({
        include: {
            tenant: true,
            property: true,
        },
    });
};
exports.AdminService = {
    getAllUsers,
    updateUserStatus,
    getAllProperties,
    getAllRentals,
};
