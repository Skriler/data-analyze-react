import React from 'react';
import { Zap } from 'lucide-react';
import { HeaderTitle } from './HeaderTitle';
import { UserMenu } from './UserMenu';
import { DEFAULT_LAYOUT_TITLE } from '@shared/layout';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title = DEFAULT_LAYOUT_TITLE,
  subtitle,
  className = '',
}) => {
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
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

AppHeader.displayName = 'AppHeader';

export { AppHeader };
