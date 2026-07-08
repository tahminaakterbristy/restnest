import express from "express";
import auth from "../../middlewares/auth";
import { RentalController } from "./rental.controller";

const router = express.Router();

router.post(
  "/",
  auth("TENANT"),
  RentalController.createRentalRequest
);

router.get(
  "/",
  auth("ADMIN", "LANDLORD"),
  RentalController.getRentalRequests
);

router.patch(
  "/:id",
  auth("LANDLORD"),
  RentalController.updateRentalStatus
);

export default router;