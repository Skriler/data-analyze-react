import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin, useRegister } from '@hooks/api/useAuth';

const loginSchema = z.object({
  Username: z.string().min(3, 'Username must be at least 3 characters').max(50),
  Password: z.string().min(6, 'Password must be at least 6 characters').max(50),
});

const registerSchema = z
  .object({
    Username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(50),
    Email: z.string().email('Invalid email address').max(80),
    Password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(50),
    ConfirmPassword: z.string(),
    FirstName: z
      .string()
      .min(3, 'First name must be at least 3 characters')
      .max(50)
      .optional(),
    LastName: z
      .string()
      .min(3, 'Last name must be at least 3 characters')
      .max(50)
      .optional(),
  })
  .refine(data => data.Password === data.ConfirmPassword, {
    message: "Passwords don't match",
    path: ['ConfirmPassword'],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface UseAuthFormsProps {
  onLoginSuccess: (result: any) => void;
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

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      Username: '',
      Password: '',
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      Username: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      FirstName: '',
      LastName: '',
    },
  });

  const handleLoginSubmit = async (data: LoginFormData) => {
    try {
      const result = await login.mutateAsync(data);
      if (result.Success) {
        onLoginSuccess(result);
      } else {
        onLoginError(result.Error || 'Invalid credentials.');
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
