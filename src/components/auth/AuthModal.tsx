import React from 'react';
import { Eye, EyeOff, ChartLine } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@components/Ui/Dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/Ui/Form';
import { Input } from '@components/Ui/Input';
import { useToast } from '@hooks/toast/useToast';
import { useAuthModal } from '@hooks/auth/useAuthModal';
import { useAuthForms } from '@hooks/auth/useAuthForms';
import type { LoginDto, RegisterDto } from '@api-types/auth';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModalHeader: React.FC<{ isLoginMode: boolean }> = React.memo(
  ({ isLoginMode }) => (
    <div className="text-center mb-6">
      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <ChartLine className="text-white text-2xl" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">
        Welcome to DataAnalyze
      </h2>
      <p className="text-gray-600 mt-2">
        {isLoginMode
          ? 'Sign in to continue to your dashboard'
          : 'Create your account to get started'}
      </p>
    </div>
  )
);

AuthModalHeader.displayName = 'AuthModalHeader';

const AuthModeTabs: React.FC<{
  isLoginMode: boolean;
  onModeChange: (isLogin: boolean) => void;
}> = React.memo(({ isLoginMode, onModeChange }) => (
  <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
    <Button
      type="button"
      variant={isLoginMode ? 'tab-active' : 'tab'}
      onClick={() => onModeChange(true)}
    >
      Sign In
    </Button>
    <Button
      type="button"
      variant={!isLoginMode ? 'tab-active-signup' : 'tab'}
      onClick={() => onModeChange(false)}
    >
      Sign Up
    </Button>
  </div>
));

AuthModeTabs.displayName = 'AuthModeTabs';

type PasswordInputProps = {
  field: React.InputHTMLAttributes<HTMLInputElement>;
  placeholder: string;
  showPassword: boolean;
  onTogglePassword: () => void;
};

const PasswordInput: React.FC<PasswordInputProps> = React.memo(
  ({ field, placeholder, showPassword, onTogglePassword }) => (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        {...field}
        variant="modal"
        className="pr-10"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1 text-gray-400 hover:text-gray-600"
        onClick={onTogglePassword}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
);

PasswordInput.displayName = 'PasswordInput';

export const AuthModal: React.FC<AuthModalProps> = React.memo(
  ({ open, onOpenChange }) => {
    const { toast } = useToast();
    const {
      isLoginMode,
      showPassword,
      showConfirmPassword,
      handleModeChange,
      handleTogglePassword,
      handleToggleConfirmPassword,
    } = useAuthModal();

    const {
      loginForm,
      registerForm,
      login,
      register,
      handleLoginSubmit,
      handleRegisterSubmit,
    } = useAuthForms({
      onLoginSuccess: result => {
        toast({
          title: 'Welcome back!',
          description: `Successfully logged in as ${result.Username}.`,
        });
        onOpenChange(false);
      },
      onLoginError: error => {
        toast({
          title: 'Login failed',
          description: error || 'Invalid credentials.',
          variant: 'destructive',
        });
      },
      onRegisterSuccess: () => {
        toast({
          title: 'Registration successful!',
          description: 'Your account has been created. You can now log in.',
        });
        handleModeChange(true);
      },
      onRegisterError: () => {
        toast({
          title: 'Registration failed',
          description: 'An error occurred while creating your account.',
          variant: 'destructive',
        });
      },
    });

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTitle className="sr-only">
          {isLoginMode ? 'Sign in to Data Analyze' : 'Sign up for Data Analyze'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {isLoginMode
            ? 'Enter your credentials to access your dashboard'
            : 'Create a new account to get started with Data Analyze'}
        </DialogDescription>
        <DialogContent className="max-w-md">
          <div className="p-6">
            <AuthModalHeader isLoginMode={isLoginMode} />
            <div className="space-y-4">
              <AuthModeTabs
                isLoginMode={isLoginMode}
                onModeChange={handleModeChange}
              />

              {isLoginMode ? (
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
                    className="space-y-4"
                  >
                    <FormField<LoginDto, 'Username'>
                      control={loginForm.control}
                      name="Username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel variant="modal">Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your username"
                              {...field}
                              variant="modal"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField<LoginDto, 'Password'>
                      control={loginForm.control}
                      name="Password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel variant="modal">Password</FormLabel>
                          <FormControl>
                            <PasswordInput
                              field={field}
                              placeholder="Enter your password"
                              showPassword={showPassword}
                              onTogglePassword={handleTogglePassword}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      variant="blue"
                      size="tall"
                      className="w-full rounded-lg"
                      disabled={login.isPending}
                    >
                      {login.isPending ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...registerForm}>
                  <form
                    onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
                    className="space-y-4"
                  >
                    <FormField<RegisterDto, 'Username'>
                      control={registerForm.control}
                      name="Username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel variant="modal">Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Choose a username"
                              {...field}
                              variant="modal"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField<RegisterDto, 'Email'>
                      control={registerForm.control}
                      name="Email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel variant="modal">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                              variant="modal"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField<RegisterDto, 'FirstName'>
                        control={registerForm.control}
                        name="FirstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel variant="modal">First Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="First name"
                                {...field}
                                variant="modal"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField<RegisterDto, 'LastName'>
                        control={registerForm.control}
                        name="LastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel variant="modal">Last Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Last name"
                                {...field}
                                variant="modal"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField<RegisterDto, 'Password'>
                      control={registerForm.control}
                      name="Password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel variant="modal">Password</FormLabel>
                          <FormControl>
                            <PasswordInput
                              field={field}
                              placeholder="Create a password"
                              showPassword={showPassword}
                              onTogglePassword={handleTogglePassword}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField<RegisterDto, 'ConfirmPassword'>
                      control={registerForm.control}
                      name="ConfirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel variant="modal">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <PasswordInput
                              field={field}
                              placeholder="Confirm your password"
                              showPassword={showConfirmPassword}
                              onTogglePassword={handleToggleConfirmPassword}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      variant="blue"
                      size="tall"
                      className="w-full rounded-lg"
                      disabled={register.isPending}
                    >
                      {register.isPending
                        ? 'Creating Account...'
                        : 'Create Account'}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

AuthModal.displayName = 'AuthModal';
