import React from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/Ui/DropdownMenu';
import { useUserMenu } from '@hooks/features/layout/useUserMenu';

interface UserMenuProps {
  className?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ className = '' }) => {
  const { userInitials, isAuthenticated, username, isAdmin, handleLogout } =
    useUserMenu();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center space-x-3 h-auto p-0 hover:bg-transparent group"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg ring-2 ring-white/10 group-hover:ring-white/20 transition-all duration-200">
                <span>{userInitials}</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-2 text-left">
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                  {username}
                </p>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <p className="text-xs text-gray-500 font-medium">
                    {isAdmin ? 'Admin' : 'Active'}
                  </p>
                </div>
              </div>

              <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-64 p-2 shadow-xl border-0 bg-white/95 backdrop-blur-sm"
          sideOffset={8}
        >
          {/* User Info Header */}
          <div className="flex items-center space-x-3 p-3 mb-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
              <span>{userInitials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {username}
              </p>
              <div className="flex items-center space-x-1 mt-0.5">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-xs text-gray-600 font-medium">
                  {isAdmin ? 'Administrator' : 'Active User'}
                </p>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator className="my-2" />

          {/* Logout Menu Item */}
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors group"
          >
            <LogOut className="mr-3 h-4 w-4 text-gray-500 group-hover:text-red-500" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Sign out</span>
              <span className="text-xs text-gray-500 group-hover:text-red-400">
                Sign out of your account
              </span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

UserMenu.displayName = 'UserMenu';

export { UserMenu };
