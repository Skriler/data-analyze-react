import { useState, useCallback } from 'react';

export const useAuthModal = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleModeChange = useCallback((isLogin: boolean) => {
    setIsLoginMode(isLogin);
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, []);

  const handleTogglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleToggleConfirmPassword = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  return {
    isLoginMode,
    showPassword,
    showConfirmPassword,
    handleModeChange,
    handleTogglePassword,
    handleToggleConfirmPassword,
  };
};
