import express from "express";

import authRoutes from "../modules/auth/auth.route";
import categoryRoutes from "../modules/category/category.route";
import propertyRoutes from "../modules/property/property.route";
import rentalRoutes from "../modules/rental/rental.route";
import reviewRoutes from "../modules/review/review.route";



const router = express.Router();

router.use("/auth", authRoutes);

router.use("/categories", categoryRoutes);

router.use("/properties", propertyRoutes);
router.use("/properties", propertyRoutes);

router.use("/reviews", reviewRoutes);

router.use("/rentals", rentalRoutes);
export default router;