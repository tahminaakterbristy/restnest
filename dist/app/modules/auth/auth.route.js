"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/register", auth_controller_1.AuthController.register);
router.post("/login", auth_controller_1.AuthController.login);
router.get("/me", (0, auth_1.default)("TENANT", "LANDLORD", "ADMIN"), auth_controller_1.AuthController.getMe);
exports.default = router;
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtcmRvM2ZtaDAwMDB2YjNvYm91NXVxN3AiLCJlbWFpbCI6ImJyaXN0eUBnbWFpbC5jb20iLCJyb2xlIjoiVEVOQU5UIiwiaWF0IjoxNzgzNjExNjQzLCJleHAiOjE3ODQyMTY0NDN9.hc4IdbY0CBIxC-o2LUHyiGcFuePeSjy4L1ICsdvF1PE"
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtcmRvZGtnYzAwMDB2YjZzNjViejcweGUiLCJlbWFpbCI6ImxhbmRsb3JkQGdtYWlsLmNvbSIsInJvbGUiOiJMQU5ETE9SRCIsImlhdCI6MTc4MzYxMTc5MywiZXhwIjoxNzg0MjE2NTkzfQ.7nEWjQlDqEIgw95rIqyRfnhLU_he5xwRiEt09qmPNPk"
