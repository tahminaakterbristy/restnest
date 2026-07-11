"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const property_controller_1 = require("./property.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)("LANDLORD"), property_controller_1.PropertyController.createProperty);
router.get("/", property_controller_1.PropertyController.getProperties);
router.get("/:id", property_controller_1.PropertyController.getSingleProperty);
router.patch("/:id", (0, auth_1.default)("LANDLORD"), property_controller_1.PropertyController.updateProperty);
router.delete("/:id", (0, auth_1.default)("LANDLORD"), property_controller_1.PropertyController.deleteProperty);
exports.default = router;
