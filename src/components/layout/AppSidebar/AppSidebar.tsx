import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  BarChart3,
  Database,
  Home,
  Search,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import { SidebarNavItem } from './SidebarNavItem';

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

const defaultNavigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Datasets', href: '/datasets', icon: Database, badge: '2' },
  { name: 'Analysis', href: '/analysis', icon: BarChart3, badge: 'New' },
  { name: 'Results', href: '/results', icon: Search },
];

const bottomNavigation: NavigationItem[] = [
  { name: 'Settings', href: '/settings', icon: Settings },
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

        {/* Bottom Navigation */}
        <div className="px-4 py-4 border-t border-gray-100">
          {bottomNavigation.map(item => (
            <SidebarNavItem
              key={item.href}
              item={item}
              isActive={location.pathname === item.href}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

AppSidebar.displayName = 'AppSidebar';

export { AppSidebar };
