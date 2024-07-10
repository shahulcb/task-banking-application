import express from "express";
import {
  activateOrDeactivateUser,
  getUserDetails,
  getUsers,
} from "../controllers/adminControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/get_users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUsers);

router
  .route("/activate_or_deactivate/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), activateOrDeactivateUser);

router
  .route("/get_user_details/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails);

export default router;
