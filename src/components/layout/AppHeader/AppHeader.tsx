import React from 'react';
import { Bell } from 'lucide-react';
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
  return (
    <header
      className={`bg-white shadow-sm border-b border-gray-200 px-6 py-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <HeaderTitle title={title} subtitle={subtitle} />

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

AppHeader.displayName = 'AppHeader';

export { AppHeader };
