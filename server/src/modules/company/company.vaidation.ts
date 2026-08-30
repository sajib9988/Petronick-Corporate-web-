import { z } from "zod";


// server side 
const createCompany = z.object({
  name: z.string({ error: "Name is required" }).min(1),
  description: z.string({ error: "Description is required" }).min(1),
  icon: z.string().optional(),
  website: z.string().optional(),
  order:  z.number().int(),
  isVisible:  z.boolean().optional(),
  revenueStage: z.string().optional(),
});

const updateCompany = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  icon: z.string().optional(),
  website: z.string().optional(),
  order: z.coerce.number().int().optional(),
  isVisible: z.coerce.boolean().optional(),
  revenueStage: z.string().optional(),
});

export const companyValidation = {
  createCompany,
  updateCompany,
};