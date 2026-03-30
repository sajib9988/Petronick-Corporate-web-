import { Router } from "express";

import { authRoutes } from "../modules/auth/auth.route";
import { companyRoutes } from "../modules/company/company.route";
import { cmsRoutes } from "../modules/cms/cms.route";
import { contactRoutes } from "../modules/contact/contact.route";
import { agentRoutes } from "../modules/Promotion-Agent/promotion-agent.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/company", companyRoutes)
router.use("/cms", cmsRoutes)
router.use("/contact", contactRoutes)
router.use("/agents", agentRoutes)

export const apiRoutes = router;
