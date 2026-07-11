"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createCategory = async (payload) => {
    const exists = await prisma_1.default.category.findUnique({
        where: {
            name: payload.name,
        },
    });
    if (exists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Category already exists");
    }
    return prisma_1.default.category.create({
        data: payload,
    });
};
const getCategories = async () => {
    return prisma_1.default.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.CategoryService = {
    createCategory,
    getCategories,
};
