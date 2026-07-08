import express from "express";
import auth from "../../middlewares/auth";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post("/", auth("TENANT"), ReviewController.createReview);

router.get("/property/:propertyId", ReviewController.getReviews);

export default router;