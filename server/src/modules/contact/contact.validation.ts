import { z } from "zod";

const createContact = z.object({
  name: z.string({ error: "Name is required" }).min(1),
  email: z.string({ error: "Email is required" }).email("Invalid email"),
  phone: z.string().optional(),
  message: z.string({ error: "Message is required" }).min(1),
});

const updateContact = z.object({
  name: z.string({ error: "Name is required" }).min(1).optional(),
  email: z.string({ error: "Email is required" }).email("Invalid email").optional(),
  phone: z.string().optional(),
  message: z.string({ error: "Message is required" }).min(1).optional(),
});



export const contactValidation = {
  createContact,
  updateContact,
};