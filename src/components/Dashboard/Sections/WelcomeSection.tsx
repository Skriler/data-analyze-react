import React from 'react';
import { useAuthState } from '@hooks/api/useAuth';

interface WelcomeSectionProps {
  className?: string;
}

const getGreeting = (hour = new Date().getHours()) => {
  const greetings = [
    { until: 5, message: 'Good night' },
    { until: 12, message: 'Good morning' },
    { until: 18, message: 'Good afternoon' },
    { until: 24, message: 'Good evening' },
  ];

  return greetings.find(g => hour < g.until)?.message ?? 'Hello';
};

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ className = '' }) => {
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

export { WelcomeSection };
