import { z } from "zod";

export const sectionSchema = z.object({
  type: z.enum(["HERO", "ABOUT", "CTA", "FEATURE", "TESTIMONIALS", "GALLERY", "CONTACT"]),
  content: z.record(z.string(), z.string()).default({}),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});