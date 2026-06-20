import { z } from "zod";

// ✅ FIX: সব section types add করা হয়েছে (WHO_WE_ARE, ECOSYSTEM, REVENUE, CLOSING)
export const sectionSchema = z.object({
  type: z.enum([
    "HERO",
    "WHO_WE_ARE",
    "ECOSYSTEM",
    "REVENUE",
    "CLOSING",
    "ABOUT",
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