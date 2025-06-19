import React from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart3, Database, Home, Search } from 'lucide-react';
import { SidebarNavItem } from './SidebarNavItem';
import type { LucideIcon } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

const defaultNavigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Datasets', href: '/datasets', icon: Database },
  { name: 'Analysis', href: '/analysis', icon: BarChart3 },
  { name: 'Results', href: '/results', icon: Search },
];

interface AppSidebarProps {
  navigation?: NavigationItem[];
  className?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  navigation = defaultNavigation,
  className = '',
}) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-sm border-r border-gray-200 ${className}`}
      aria-label="Main navigation"
    >
      <div className="flex flex-col h-full pt-20">
        <nav className="flex-1 px-4 pb-4 space-y-1" role="navigation">
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
