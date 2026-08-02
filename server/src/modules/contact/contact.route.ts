import { Router } from "express";
import { contactController } from "./contact.controller.js";
import { authorize } from "../../shared/middlewares/authorize.middleware.js";
import { Role } from "../../../generated/prisma-client/index.js";



const router = Router();

// Public
router.post("/", contactController.createContact);

// Admin only
router.get("/", authorize(Role.ADMIN, Role.SUPER_ADMIN), contactController.getAllContacts);
router.get("/export/csv", authorize(Role.ADMIN, Role.SUPER_ADMIN), contactController.exportCSV);
router.get("/:id", authorize(Role.ADMIN, Role.SUPER_ADMIN), contactController.getContactById);
router.delete("/:id", authorize(Role.ADMIN, Role.SUPER_ADMIN), contactController.deleteContact);

export const contactRoutes = router;