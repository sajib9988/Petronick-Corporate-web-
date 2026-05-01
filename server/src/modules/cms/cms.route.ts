import { Router } from "express";
import { cmsController } from "./cms.controller.js";
import { authorize } from "../../shared/middlewares/authorize.middleware.js";
import { Role } from "../../../generated/prisma-client/index.js";
import { uploadSectionImage } from "../../shared/utils/upload.js";




const router = Router();

// PAGE routes — Public
router.get("/pages", cmsController.getAllPages);
router.get("/pages/:slug", cmsController.getPageBySlug);

// PAGE routes — Admin only
router.post("/pages", authorize(Role.ADMIN), cmsController.createPage);
router.patch("/pages/:slug", authorize(Role.ADMIN), cmsController.updatePage);
router.delete("/pages/:slug", authorize(Role.ADMIN), cmsController.deletePage);

// SECTION routes — Public
router.get("/sections/page/:pageId", cmsController.getSectionsByPage);
router.get("/sections/:id", cmsController.getSectionById);

// SECTION routes — Admin only
router.post(
  "/sections",
  authorize(Role.ADMIN),
  uploadSectionImage,
  cmsController.createSection,
);

router.patch(
  "/sections/:id",
  authorize(Role.ADMIN),
  uploadSectionImage,
  cmsController.updateSection,
);

router.delete(
  "/sections/:id",
  authorize(Role.ADMIN),
  cmsController.deleteSection,
);

export const cmsRoutes = router;