"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_route_1 = __importDefault(require("../auth/auth.route"));
const user_controller_1 = require("./user.controller");
auth_route_1.default.patch("/profile", (0, auth_1.default)("TENANT", "LANDLORD", "ADMIN"), user_controller_1.UserController.updateProfile);
