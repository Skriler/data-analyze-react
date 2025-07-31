import React from 'react';
import { useAuthState, useLogout } from '@hooks/api/useAuth';
import { useToast } from '@hooks/toast';

export const useUserMenu = () => {
  const { data: authState } = useAuthState();
  const logout = useLogout();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      toast({
        title: 'Logged out successfully',
        description: 'You have been logged out of your account.',
      });
    } catch {
      toast({
        title: 'Logout failed',
        description: 'An error occurred while logging out.',
        variant: 'destructive',
      });
    }
  };

  const userInitials = React.useMemo(() => {
    if (!authState?.user?.username) return 'U';

    return authState.user.username
      .split('_')
      .map((part: string) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [authState?.user?.username]);

  const isAuthenticated = authState?.isAuthenticated;
  const username = authState?.user?.username || 'Unknown User';
  const isAdmin = authState?.isAdmin;

  return {
    userInitials,
    isAuthenticated,
    username,
    isAdmin,
    handleLogout,
  };
};
