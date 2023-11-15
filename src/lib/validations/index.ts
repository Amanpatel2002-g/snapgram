import * as z from "zod";
export const signUpValidationSchema = z.object({
    name:z.string().min(2, {message:'Too short'}),
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password:z.string().min(8, {message:'Password must at least 8 character'})
})