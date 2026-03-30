import { z } from "zod";

const createPage = z.object({
  slug: z.string({ error: "Slug is required" }).min(1),
  title: z.string({ error: "Title is required" }).min(1),
});

const updatePage = z.object({
  title: z.string().min(1).optional(),
});

const createSection = z.object({
  pageId: z.string({ error: "Page ID is required" }).min(1),
  type: z.enum(["HERO", "ABOUT", "CTA", "TESTIMONIALS", "GALLERY", "CONTACT", "FEATURE"], {
    error: "Invalid section type",
  }),
  content: z.any().default({}),
  order: z.coerce.number().int().default(0).optional(),
  isVisible: z.coerce.boolean().default(true).optional(),
});

const updateSection = z.object({
  type: z.enum(["HERO", "ABOUT", "CTA", "TESTIMONIALS", "GALLERY", "CONTACT", "FEATURE"]).optional(),
  content: z.any().optional(),
  order: z.coerce.number().int().optional(),
  isVisible: z.coerce.boolean().optional(),
});

export const cmsValidation = {
  createPage,
  updatePage,
  createSection,
  updateSection,
};