import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin, useRegister } from '@hooks/api/useAuth';
import type { LoginDto, AuthResult } from '@api-types/auth';
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from '@shared/schemas/auth';

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
