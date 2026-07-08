import express from "express";
import auth from "../../middlewares/auth";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get(
  "/users",
  auth("ADMIN"),
  AdminController.getUsers
);

router.patch(
  "/users/:id",
  auth("ADMIN"),
  AdminController.updateUserStatus
);

router.get(
  "/properties",
  auth("ADMIN"),
  AdminController.getProperties
);

router.get(
  "/rentals",
  auth("ADMIN"),
  AdminController.getRentals
);

export default router;