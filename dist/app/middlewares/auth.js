"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const prisma_1 = __importDefault(require("../config/prisma"));
const auth = (...roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(401, "Unauthorized");
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        const user = await prisma_1.default.user.findUnique({
            where: {
                id: decoded.id,
            },
        });
        if (!user) {
            throw new AppError_1.default(404, "User not found");
        }
        if (user.isBlocked) {
            throw new AppError_1.default(403, "Your account is blocked");
        }
        req.user = decoded;
        if (roles.length && !roles.includes(decoded.role)) {
            throw new AppError_1.default(403, "Forbidden Access");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = auth;
