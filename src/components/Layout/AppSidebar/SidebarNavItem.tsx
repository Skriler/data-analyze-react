import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@libs/utils/cn';
import type { NavigationItem } from '@shared/layout';

interface SidebarNavItemProps {
  item: NavigationItem;
  isActive: boolean;
  className?: string;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  item,
  isActive,
  className = '',
}) => (
  <Link
    to={item.href}
    className={cn(
      'group flex items-center justify-between px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-[1.02]',
      isActive
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
      className
    )}
    aria-current={isActive ? 'page' : undefined}
  >
    <div className="flex items-center">
      <item.icon
        className={cn(
          'mr-3 h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110',
          isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
        )}
        aria-hidden="true"
      />
      <span className="font-medium">{item.name}</span>
    </div>

    {item.badge && (
      <span
        className={cn(
          'ml-3 inline-block py-1 px-2 text-xs font-semibold rounded-full transition-colors',
          isActive
            ? 'bg-white/20 text-white'
            : item.badge === 'New'
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
        )}
      >
        {item.badge}
      </span>
    )}
  </Link>
);

SidebarNavItem.displayName = 'SidebarNavItem';

export { SidebarNavItem };
