import { z } from "zod";

// US phone display format: (XXX) XXX-XXXX
const US_PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;

const createContact = z.object({
  name: z.string({ error: "Name is required" }).min(1),
  email: z.string({ error: "Email is required" }).email("Invalid email"),
  phone: z
    .string()
    .regex(US_PHONE_REGEX, "Phone must be in the format (XXX) XXX-XXXX")
    .optional(),
  subject: z.string().optional(),
  message: z.string({ error: "Message is required" }).min(1),
});

const updateContact = z.object({
  name: z.string({ error: "Name is required" }).min(1).optional(),
  email: z.string({ error: "Email is required" }).email("Invalid email").optional(),
  phone: z
    .string()
    .regex(US_PHONE_REGEX, "Phone must be in the format (XXX) XXX-XXXX")
    .optional(),
  subject: z.string().optional(),
  message: z.string({ error: "Message is required" }).min(1).optional(),
});



export const contactValidation = {
  createContact,
  updateContact,
};