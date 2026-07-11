"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const landlord_controller_1 = require("./landlord.controller");
const router = express_1.default.Router();
router.get("/properties", (0, auth_1.default)("LANDLORD"), landlord_controller_1.LandlordController.getMyProperties);
router.get("/requests", (0, auth_1.default)("LANDLORD"), landlord_controller_1.LandlordController.getRentalRequests);
router.patch("/requests/:id", (0, auth_1.default)("LANDLORD"), landlord_controller_1.LandlordController.updateRentalStatus);
router.patch("/properties/:id", (0, auth_1.default)("LANDLORD"), landlord_controller_1.LandlordController.updateAvailability);
exports.default = router;
