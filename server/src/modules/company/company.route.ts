import { Router } from "express";

import { authorize } from "../../shared/middlewares/authorize.middleware";
import { companyController } from "./company.controller";
import { uploadLogo } from "../../shared/utils/upload";
import { Role } from "../../../generated/prisma-client";

const router = Router();

// Public
router.get("/", companyController.getAllCompanies);
router.get("/:id", companyController.getCompanyById);

// Admin only
router.post(
  "/",
  authorize(Role.ADMIN),
  uploadLogo,
  companyController.createCompany,
);

router.patch(
  "/:id",
  authorize(Role.ADMIN),
  uploadLogo,
  companyController.updateCompany,
);

router.delete(
  "/:id",
  authorize(Role.ADMIN),
  companyController.deleteCompany,
);

export const companyRoutes = router;