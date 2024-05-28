import express from "express";
import {
  makePayment,
  verifyPayment,
} from "../controller/transactionController.js";

const transactionRouter = express.Router();

transactionRouter.post("/payment", makePayment);
transactionRouter.post("/payment/verify", verifyPayment);

export default transactionRouter;
