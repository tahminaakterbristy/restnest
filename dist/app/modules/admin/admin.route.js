"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.get("/users", (0, auth_1.default)("ADMIN"), admin_controller_1.AdminController.getUsers);
router.patch("/users/:id", (0, auth_1.default)("ADMIN"), admin_controller_1.AdminController.updateUserStatus);
router.get("/properties", (0, auth_1.default)("ADMIN"), admin_controller_1.AdminController.getProperties);
router.get("/rentals", (0, auth_1.default)("ADMIN"), admin_controller_1.AdminController.getRentals);
exports.default = router;
