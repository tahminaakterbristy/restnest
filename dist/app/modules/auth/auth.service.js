"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const bcrypt_1 = require("../../utils/bcrypt");
const jwt_1 = require("../../utils/jwt");
const bcrypt_2 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config/config"));
const registerUser = async (payload) => {
    const existingUser = await prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await (0, bcrypt_1.hashPassword)(payload.password);
    const user = await prisma_1.default.user.create({
        data: {
            ...payload,
            password: hashedPassword,
        },
    });
    return user;
};
const loginUser = async (payload) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const matched = await bcrypt_2.default.compare(payload.password, user.password);
    if (!matched) {
        throw new Error("Password doesn't match");
    }
    const token = (0, jwt_1.createToken)({
        id: user.id,
        email: user.email,
        role: user.role,
    }, config_1.default.jwt_secret, config_1.default.jwt_expires);
    return {
        token,
        user,
    };
};
exports.AuthService = {
    registerUser,
    loginUser,
};
