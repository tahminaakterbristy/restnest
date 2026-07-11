"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const createProperty = async (payload, landlordId) => {
    return prisma_1.default.property.create({
        data: {
            ...payload,
            landlordId,
        },
    });
};
const getProperties = async (query) => {
    const { search, city, category, minRent, maxRent, page = 1, limit = 10, sort = "createdAt", sortOrder = "desc", } = query;
    const where = {};
    // Search
    if (search) {
        where.OR = [
            {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                city: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }
    // City Filter
    if (city) {
        where.city = city;
    }
    // Category Filter
    if (category) {
        where.category = {
            name: category,
        };
    }
    // Rent Filter
    if (minRent || maxRent) {
        where.rent = {};
        if (minRent) {
            where.rent.gte = Number(minRent);
        }
        if (maxRent) {
            where.rent.lte = Number(maxRent);
        }
    }
    const result = await prisma_1.default.property.findMany({
        where,
        include: {
            category: true,
            landlord: true,
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: {
            [sort]: sortOrder,
        },
    });
    const total = await prisma_1.default.property.count({
        where,
    });
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
        },
        data: result,
    };
};
const getSingleProperty = async (id) => {
    return prisma_1.default.property.findUnique({
        where: { id },
        include: {
            category: true,
            landlord: true,
        },
    });
};
const updateProperty = async (id, payload, landlordId) => {
    return prisma_1.default.property.update({
        where: {
            id,
            landlordId,
        },
        data: payload,
    });
};
const deleteProperty = async (id, landlordId) => {
    return prisma_1.default.property.delete({
        where: {
            id,
            landlordId,
        },
    });
};
exports.PropertyService = {
    createProperty,
    getProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty,
};
