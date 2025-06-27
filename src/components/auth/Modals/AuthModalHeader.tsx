import React from 'react';
import { ChartLine } from 'lucide-react';

interface AuthModalHeaderProps {
  isLoginMode: boolean;
}

const AuthModalHeader: React.FC<AuthModalHeaderProps> = React.memo(
  ({ isLoginMode }) => (
    <div className="text-center mb-6">
      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <ChartLine className="text-white text-2xl" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">
        Welcome to Data Analyze
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

export { AuthModalHeader };
