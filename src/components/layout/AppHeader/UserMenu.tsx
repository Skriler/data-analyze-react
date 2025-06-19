import React from 'react';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/Ui/DropdownMenu';
import { useAuthState, useLogout } from '@hooks/api/useAuth';
import { useToast } from '@hooks/toast/useToast';

interface UserMenuProps {
  className?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ className = '' }) => {
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
    } catch (error) {
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

  if (!authState?.isAuthenticated) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">
          {authState.user?.username || 'Unknown User'}
        </p>
        <p className="text-xs text-gray-500">
          {authState.isAdmin ? 'Admin' : 'User'}
        </p>
      </div>

      <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent-500 rounded-full flex items-center justify-center text-white font-semibold">
        <span>{userInitials}</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" aria-label="User menu">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem disabled>
            <User className="mr-2 h-4 w-4" />
            <span>{authState.user?.username}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

UserMenu.displayName = 'UserMenu';

export { UserMenu };
