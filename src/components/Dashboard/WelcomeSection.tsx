import React from 'react';
import { useAuthState } from '@hooks/api/useAuth';

interface WelcomeSectionProps {
  className?: string;
}

const getGreeting = (hour = new Date().getHours()) => {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  className = '',
}) => {
  const { data: authState } = useAuthState();

  const welcomeMessage = React.useMemo(() => {
    const username = authState?.user?.username || 'User';
    const greeting = getGreeting();

    return `${greeting}, ${username}`;
  }, [authState?.user?.username]);

  return (
    <div className={`mb-6 ${className}`}>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-lg text-gray-600">{welcomeMessage}</p>
    </div>
  );
};
