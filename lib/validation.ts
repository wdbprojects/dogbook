import { z } from "zod";

export const signUpSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Username can only contain letters, numbers, underscores and dashes",
    }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: z.string().trim().min(1, { message: "Username is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const postSchema = z.object({
  content: z.string().trim().min(1, { message: "Username is required" }),
});

export type PostValues = z.infer<typeof postSchema>;
