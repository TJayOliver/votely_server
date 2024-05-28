import express from "express";
import { transaction } from "../controller/transactionController.js";

const transactionRouter = express.Router();

transactionRouter.post("/payment", transaction);

export default transactionRouter;
