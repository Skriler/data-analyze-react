import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(50),
  password: z.string().min(6, 'Password must be at least 6 characters').max(50),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(50),
    email: z.string().email('Invalid email address').max(80),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(50),
    confirmPassword: z.string(),
    firstName: z
      .string()
      .min(3, 'First name must be at least 3 characters')
      .max(50)
      .optional(),
    lastName: z
      .string()
      .min(3, 'Last name must be at least 3 characters')
      .max(50)
      .optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['ConfirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
