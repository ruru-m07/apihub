import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  username: z.string().refine((value) => /^[a-zA-Z0-9-]+$/.test(value), {
    message:
      "Invalid characters in the name. Only letters, numbers, and hyphens are allowed.",
  }),
});
