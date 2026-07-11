"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const rental_controller_1 = require("./rental.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)("TENANT"), rental_controller_1.RentalController.createRentalRequest);
router.get("/", (0, auth_1.default)("ADMIN", "LANDLORD"), rental_controller_1.RentalController.getRentalRequests);
router.patch("/:id", (0, auth_1.default)("LANDLORD"), rental_controller_1.RentalController.updateRentalStatus);
exports.default = router;
