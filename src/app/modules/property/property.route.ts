import express from "express";
import auth from "../../middlewares/auth";
import { PropertyController } from "./property.controller";

const router = express.Router();

router.post("/", auth("LANDLORD"), PropertyController.createProperty);

router.get("/", PropertyController.getProperties);

router.get("/:id", PropertyController.getSingleProperty);

router.patch("/:id", auth("LANDLORD"), PropertyController.updateProperty);

router.delete("/:id", auth("LANDLORD"), PropertyController.deleteProperty);

export default router;