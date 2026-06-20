import { Router } from "express";
import { companyController } from "./company.controller.js";
import { authorize } from "../../shared/middlewares/authorize.middleware.js";
import { uploadLogo } from "../../shared/utils/upload.js";
import { Role } from "../../../generated/prisma-client/index.js";


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