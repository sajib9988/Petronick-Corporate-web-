import { z } from "zod";

const createCompany = z.object({
  name: z.string({ error: "Name is required" }).min(1),
  description: z.string({ error: "Description is required" }).min(1),
  website: z.string().url("Invalid website URL").optional(),
  order: z.coerce.number().int().default(0).optional(),
  isVisible: z.coerce.boolean().default(true).optional(),
  revenueStage: z.string().optional(),
});

const updateCompany = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  website: z.string().url("Invalid website URL").optional(),
  order: z.coerce.number().int().optional(),
  isVisible: z.coerce.boolean().optional(),
  revenueStage: z.string().optional(),
});

export const companyValidation = {
  createCompany,
  updateCompany,
};