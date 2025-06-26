import React from 'react';
import { Bell, Search, Zap } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { HeaderTitle } from './HeaderTitle';
import { UserMenu } from './UserMenu';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title = 'Data Analysis Platform',
  subtitle,
  className = '',
}) => {
  // TODO: Implement notification functionality
  const [hasNotifications, setHasNotifications] = React.useState(true);

  return (
    <header
      className={`bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 px-6 py-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <HeaderTitle title={title} subtitle={subtitle} />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <Button variant="ghost" size="sm" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>

          {/* Notifications with indicator */}
          <div className="relative">
            <Button variant="ghost" size="sm" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
            {hasNotifications && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
            )}
          </div>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};

AppHeader.displayName = 'AppHeader';

export { AppHeader };
