import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route.js";
import { companyRoutes } from "../modules/company/company.route.js";
import { cmsRoutes } from "../modules/cms/cms.route.js";
import { contactRoutes } from "../modules/contact/contact.route.js";
import { agentRoutes } from "../modules/Promotion-Agent/promotion-agent.route.js";


const router = Router();

router.use("/auth", authRoutes);
router.use("/company", companyRoutes);
router.use("/cms", cmsRoutes);
router.use("/contact", contactRoutes);
router.use("/agents", agentRoutes)

export const apiRoutes = router;
