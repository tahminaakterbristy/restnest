import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth("ADMIN"),
  CategoryController.createCategory
);

router.get("/", CategoryController.getCategories);

export default router;