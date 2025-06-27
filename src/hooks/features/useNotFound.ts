import { useCallback } from 'react';

export const useNotFound = () => {
  const handleGoHome = useCallback(() => {
    window.location.href = '/';
  }, []);

  const handleGoBack = useCallback(() => {
    window.history.back();
  }, []);

  const navigation = {
    goHome: handleGoHome,
    goBack: handleGoBack,
  };

  const suggestions = [
    'Check the URL for typos',
    'Return to the dashboard to navigate properly',
    'Use the browser back button',
    'Contact support if you believe this is an error',
  ];

  return { navigation, suggestions };
};
