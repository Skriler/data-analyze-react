import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@components/Ui/Dialog';
import { useAuthModal } from '@hooks/features/auth/useAuthModal';
import { useAuthForms } from '@hooks/features/auth/useAuthForms';
import { useToast } from '@hooks/toast/useToast';
import { AuthModalHeader } from './AuthModalHeader';
import { AuthModeTabs } from './AuthModeTabs';
import { LoginForm, RegisterForm } from '../Forms';
import { AUTH_MESSAGES } from '@shared/auth/constants';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = React.memo(
  ({ open, onOpenChange }) => {
    const { toast } = useToast();
    const modalState = useAuthModal();

    const authForms = useAuthForms({
      onLoginSuccess: result => {
        toast({
          title: AUTH_MESSAGES.LOGIN.SUCCESS_TITLE,
          description: AUTH_MESSAGES.LOGIN.SUCCESS_DESCRIPTION(result.username),
        });
        onOpenChange(false);
      },
      onLoginError: error => {
        toast({
          title: AUTH_MESSAGES.LOGIN.ERROR_TITLE,
          description: error || AUTH_MESSAGES.LOGIN.ERROR_DESCRIPTION,
          variant: 'destructive',
        });
      },
      onRegisterSuccess: () => {
        toast({
          title: AUTH_MESSAGES.REGISTER.SUCCESS_TITLE,
          description: AUTH_MESSAGES.REGISTER.SUCCESS_DESCRIPTION,
        });
        modalState.handleModeChange(true);
      },
      onRegisterError: () => {
        toast({
          title: AUTH_MESSAGES.REGISTER.ERROR_TITLE,
          description: AUTH_MESSAGES.REGISTER.ERROR_DESCRIPTION,
          variant: 'destructive',
        });
      },
    });

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTitle className="sr-only">
          {modalState.isLoginMode
            ? 'Sign in to Data Analyze'
            : 'Sign up for Data Analyze'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {modalState.isLoginMode
            ? 'Enter your credentials to access your dashboard'
            : 'Create a new account to get started with Data Analyze'}
        </DialogDescription>
        <DialogContent className="max-w-md">
          <div className="p-6">
            <AuthModalHeader isLoginMode={modalState.isLoginMode} />

            <div className="space-y-4">
              <AuthModeTabs
                isLoginMode={modalState.isLoginMode}
                onModeChange={modalState.handleModeChange}
              />

              {modalState.isLoginMode ? (
                <LoginForm
                  form={authForms.loginForm}
                  onSubmit={authForms.handleLoginSubmit}
                  isLoading={authForms.login.isPending}
                  showPassword={modalState.showPassword}
                  onTogglePassword={modalState.handleTogglePassword}
                />
              ) : (
                <RegisterForm
                  form={authForms.registerForm}
                  onSubmit={authForms.handleRegisterSubmit}
                  isLoading={authForms.register.isPending}
                  showPassword={modalState.showPassword}
                  showConfirmPassword={modalState.showConfirmPassword}
                  onTogglePassword={modalState.handleTogglePassword}
                  onToggleConfirmPassword={
                    modalState.handleToggleConfirmPassword
                  }
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

AuthModal.displayName = 'AuthModal';

export { AuthModal };
