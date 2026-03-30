import {z} from 'zod';


 const createAgent = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    location: z.string().min(1, "Location is required"),
    experience: z.string().min(1, "Experience is required"),
    focus: z.string().min(1, "Focus is required"),
    message: z.string().min(1, "Message is required"),
    businessUnits: z.array(z.string()).min(1, "At least one business unit is required")

})

 const updateStatus = z.object({
    status: z.enum(["PENDING", "REVIEWED", "APPROVED", "REJECTED"])
})

export const agentValidation = {
  createAgent,
  updateStatus,
};