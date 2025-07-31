import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarNavItem } from './SidebarNavItem';
import { DEFAULT_NAVIGATION, type NavigationItem } from '@shared/layout';

interface AppSidebarProps {
  navigation?: NavigationItem[];
  className?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  navigation = DEFAULT_NAVIGATION,
  className = '',
}) => {
  const location = useLocation();

  return (
    <aside
      className={`w-64 h-full bg-white/90 backdrop-blur-sm shadow-lg border-r border-gray-200/50 ${className}`}
      aria-label="Main navigation"
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 px-4 py-4 space-y-1" role="navigation">
          {navigation.map(item => (
            <SidebarNavItem
              key={item.href}
              item={item}
              isActive={location.pathname === item.href}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

AppSidebar.displayName = 'AppSidebar';

export { AppSidebar };
