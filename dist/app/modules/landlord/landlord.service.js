"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandlordService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const getMyProperties = async (landlordId) => {
    return prisma_1.default.property.findMany({
        where: {
            landlordId,
        },
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getRentalRequests = async (landlordId) => {
    return prisma_1.default.rentalRequest.findMany({
        where: {
            property: {
                landlordId,
            },
        },
        include: {
            tenant: true,
            property: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const updateRentalStatus = async (rentalId, status) => {
    return prisma_1.default.rentalRequest.update({
        where: {
            id: rentalId,
        },
        data: {
            status,
        },
    });
};
const updateAvailability = async (propertyId, isAvailable) => {
    return prisma_1.default.property.update({
        where: {
            id: propertyId,
        },
        data: {
            isAvailable,
        },
    });
};
const getDashboardStats = async (landlordId) => {
    const [totalProperties, availableProperties, rentedProperties, activeRentals, earnings,] = await Promise.all([
        prisma_1.default.property.count({
            where: {
                landlordId,
            },
        }),
        prisma_1.default.property.count({
            where: {
                landlordId,
                isAvailable: true,
            },
        }),
        prisma_1.default.property.count({
            where: {
                landlordId,
                isAvailable: false,
            },
        }),
        prisma_1.default.rental.count({
            where: {
                property: {
                    landlordId,
                },
                status: "ACTIVE",
            },
        }),
        prisma_1.default.payment.aggregate({
            where: {
                status: "PAID",
                property: {
                    landlordId,
                },
            },
            _sum: {
                amount: true,
            },
        }),
    ]);
    return {
        totalProperties,
        availableProperties,
        rentedProperties,
        activeRentals,
        totalEarnings: earnings._sum.amount || 0,
    };
};
exports.LandlordService = {
    getMyProperties,
    getRentalRequests,
    updateRentalStatus,
    updateAvailability,
    getDashboardStats
};
