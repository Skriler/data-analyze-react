import React from 'react';
import { Button } from '@components/Ui/Button';

interface AuthModeTabsProps {
  isLoginMode: boolean;
  onModeChange: (isLogin: boolean) => void;
}

const AuthModeTabs: React.FC<AuthModeTabsProps> = React.memo(
  ({ isLoginMode, onModeChange }) => (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
      <Button
        type="button"
        variant={isLoginMode ? 'tab-active-signup' : 'tab'}
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
  )
);

AuthModeTabs.displayName = 'AuthModeTabs';

export { AuthModeTabs };
