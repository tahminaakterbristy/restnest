"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const updateProfile = async (userId, payload) => {
    return prisma_1.default.user.update({
        where: {
            id: userId,
        },
        data: payload,
    });
};
exports.UserService = {
    updateProfile,
};
