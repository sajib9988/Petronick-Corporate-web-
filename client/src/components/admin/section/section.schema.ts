import { z } from "zod";

export const sectionSchema = z.object({
  type: z.enum([
    "HERO",
    "WHO_WE_ARE",
    "ECOSYSTEM",
    "REVENUE",
    "CLOSING",
    "ABOUT",

    // ✅ New sections
    "SNAPSHOT",
    "VALUES",

    "CTA",
    "FEATURE",
    "TESTIMONIALS",
    "GALLERY",
    "CONTACT",
  ]),

  content: z.record(z.string(), z.any()).default({}),

  order: z.number().int().default(0),

  isVisible: z.boolean().default(true),
});