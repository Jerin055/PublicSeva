import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import {
  getAllIssuesAdmin,
  updateIssueStatus
} from "../controllers/adminController.js";

const router = express.Router();

/**
 * Admin issue dashboard
 */
router.get(
  "/issues",
  authMiddleware,
  allowRoles("admin"),
  getAllIssuesAdmin
);

/**
 * Update issue status
 */
router.patch(
  "/issues/:id/status",
  authMiddleware,
  allowRoles("admin"),
  updateIssueStatus
);

export default router;
