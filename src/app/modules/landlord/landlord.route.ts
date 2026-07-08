import express from "express";
import auth from "../../middlewares/auth";
import { LandlordController } from "./landlord.controller";

const router = express.Router();

router.get(
  "/properties",
  auth("LANDLORD"),
  LandlordController.getMyProperties
);

router.get(
  "/requests",
  auth("LANDLORD"),
  LandlordController.getRentalRequests
);

router.patch(
  "/requests/:id",
  auth("LANDLORD"),
  LandlordController.updateRentalStatus
);

router.patch(
  "/properties/:id",
  auth("LANDLORD"),
  LandlordController.updateAvailability
);

export default router;