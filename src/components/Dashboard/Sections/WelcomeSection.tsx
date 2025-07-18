import React from 'react';
import { useAuthState } from '@hooks/api/useAuth';
import { generateWelcomeMessage } from '@libs/utils/dashboard/utils';

interface WelcomeSectionProps {
  className?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ className = '' }) => {
  const { data: authState } = useAuthState();

  const welcomeMessage = React.useMemo(() => {
    return generateWelcomeMessage(authState?.user?.username);
  }, [authState?.user?.username]);

  return (
    <div className={`mb-6 ${className}`}>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-lg text-gray-600">{welcomeMessage}</p>
    </div>
  );
};

export { WelcomeSection };
