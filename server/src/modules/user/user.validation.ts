import {z} from "zod"

const updateUserRole= z. object({
    role: z.enum(["SUPER_ADMIN", "ADMIN", "USER"])  
})

export const userValidation ={updateUserRole}