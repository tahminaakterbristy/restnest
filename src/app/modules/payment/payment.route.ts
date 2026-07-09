import express from "express";

import auth from "../../middlewares/auth";

import { PaymentController } from "./payment.controller";

const router=express.Router();

router.post(

"/create/:rentalId",

auth("TENANT"),

PaymentController.createPayment

);

router.post("/success", PaymentController.paymentSuccess);

router.post("/fail", PaymentController.paymentFail);

router.post("/cancel", PaymentController.paymentCancel);

router.get(
  "/",
  auth("TENANT"),
  PaymentController.getPayments
);

router.get(
  "/:id",
  auth("TENANT"),
  PaymentController.getPaymentDetails
);
export default router;