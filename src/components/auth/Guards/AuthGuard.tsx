import React from 'react';
import { useAuthState } from '@hooks/api/useAuth';
import { Spinner } from '@components/Ui/Spinner';
import { AuthModal } from '../Modals';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = React.memo(({ children }) => {
  const { data: authState, isLoading } = useAuthState();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!authState?.isAuthenticated) {
    return <AuthModal open={true} onOpenChange={() => {}} />;
  }

  return <>{children}</>;
});

AuthGuard.displayName = 'AuthGuard';

export { AuthGuard };
