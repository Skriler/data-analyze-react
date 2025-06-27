import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin, useRegister } from '@hooks/api/useAuth';
import type { LoginDto, RegisterDto, AuthResult } from '@api-types/auth';

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(50),
  password: z.string().min(6, 'Password must be at least 6 characters').max(50),
});

const registerSchema = z
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

interface UseAuthFormsProps {
  onLoginSuccess: (result: AuthResult) => void;
  onLoginError: (error: string) => void;
  onRegisterSuccess: () => void;
  onRegisterError: () => void;
}

export const useAuthForms = ({
  onLoginSuccess,
  onLoginError,
  onRegisterSuccess,
  onRegisterError,
}: UseAuthFormsProps) => {
  const login = useLogin();
  const register = useRegister();

  const loginForm = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  type RegisterFormData = RegisterDto & { confirmPassword: string };

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
  });

  const handleLoginSubmit = async (data: LoginDto) => {
    try {
      const result: AuthResult = await login.mutateAsync(data);
      if (result.success) {
        onLoginSuccess(result);
      } else {
        onLoginError(result.error ?? 'Invalid credentials.');
      }
    } catch (error) {
      onLoginError('An error occurred while logging in.');
    }
  };

  const handleRegisterSubmit = async (data: RegisterFormData) => {
    try {
      await register.mutateAsync(data);
      onRegisterSuccess();
      registerForm.reset();
    } catch (error) {
      onRegisterError();
    }
  };

  return {
    loginForm,
    registerForm,
    login,
    register,
    handleLoginSubmit,
    handleRegisterSubmit,
  };
};
