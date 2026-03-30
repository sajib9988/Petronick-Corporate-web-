import { Router } from "express";

import { authorize } from "../../shared/middlewares/authorize.middleware";
import { contactController } from "./contact.controller";
import { Role } from "../../../generated/prisma-client";

const router = Router();

// Public
router.post("/", contactController.createContact);

// Admin only
router.get("/", authorize(Role.ADMIN), contactController.getAllContacts);
router.get("/export/csv", authorize(Role.ADMIN), contactController.exportCSV);
router.get("/:id", authorize(Role.ADMIN), contactController.getContactById);
router.delete("/:id", authorize(Role.ADMIN), contactController.deleteContact);

export const contactRoutes = router;