import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  createTransaction,
  getTransactionHistory,
} from "../controllers/transactionControllers.js";

const router = express.Router();

router
  .route("/create_transactions")
  .post(isAuthenticatedUser, createTransaction);

router.route("/history").get(isAuthenticatedUser, getTransactionHistory);

export default router;
