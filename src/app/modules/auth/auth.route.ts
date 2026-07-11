import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.get(
  "/me",
  auth("TENANT", "LANDLORD", "ADMIN"),
  AuthController.getMe
);

export default router;

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtcmRvM2ZtaDAwMDB2YjNvYm91NXVxN3AiLCJlbWFpbCI6ImJyaXN0eUBnbWFpbC5jb20iLCJyb2xlIjoiVEVOQU5UIiwiaWF0IjoxNzgzNjExNjQzLCJleHAiOjE3ODQyMTY0NDN9.hc4IdbY0CBIxC-o2LUHyiGcFuePeSjy4L1ICsdvF1PE"
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtcmRvZGtnYzAwMDB2YjZzNjViejcweGUiLCJlbWFpbCI6ImxhbmRsb3JkQGdtYWlsLmNvbSIsInJvbGUiOiJMQU5ETE9SRCIsImlhdCI6MTc4MzYxMTc5MywiZXhwIjoxNzg0MjE2NTkzfQ.7nEWjQlDqEIgw95rIqyRfnhLU_he5xwRiEt09qmPNPk"