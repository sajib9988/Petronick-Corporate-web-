import { Router } from "express";
import { agentController } from "./promotion-agent.controller.js";
import { authorize } from "../../shared/middlewares/authorize.middleware.js";
import { Role } from "../../../generated/prisma-client/index.js";



const router = Router();

// Public
router.post("/", agentController.createAgent);

// Admin only
router.get("/", authorize(Role.ADMIN), agentController.getAllAgents);
router.get("/export/csv", authorize(Role.ADMIN), agentController.exportCSV);
router.get("/:id", authorize(Role.ADMIN), agentController.getAgentById);
router.patch("/:id/status", authorize(Role.ADMIN), agentController.updateAgentStatus);
router.delete("/:id", authorize(Role.ADMIN), agentController.deleteAgent);

export const agentRoutes = router;