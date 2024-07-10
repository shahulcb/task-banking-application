import express from "express";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import {
  createAccountDetails,
  deleteAccountDetails,
  getAccountDetails,
} from "../controllers/accountDetailsControllers.js";

const router = express.Router();

router
  .route("/add_account_details")
  .post(isAuthenticatedUser, authorizeRoles("user"), createAccountDetails);

router
  .route("/delete_account_details/:id")
  .delete(isAuthenticatedUser, authorizeRoles("user"), deleteAccountDetails);

router
  .route("/get_account_details")
  .get(isAuthenticatedUser, authorizeRoles("user"), getAccountDetails);

export default router;
