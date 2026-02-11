import { z } from "zod";

export const loginSchema = z.object({
    username: z
        .string()
        .min(1, "Username is required")
        .min(3, "Min 3 characters"),

    password: z
        .string()
        .min(6, "Min 6 characters")
        .max(64, "Too long"),
});

export const registerSchema = z.object({
    username: z
        .string()
        .min(1, "Username is required")
        .min(3, "Min 3 characters"),

    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email address"),


    password: z
        .string()
        .min(8, "Min 8 characters")
        .regex(/[A-Z]/, "One uppercase letter required")
        .regex(/[0-9]/, "One number required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;