import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@libs/utils/cn';
import type { LucideIcon } from 'lucide-react';

interface SidebarNavItemProps {
  item: {
    name: string;
    href: string;
    icon: LucideIcon;
    badge?: string;
  };
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
      'group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md transition-colors',
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
      className
    )}
    aria-current={isActive ? 'page' : undefined}
  >
    <div className="flex items-center">
      <item.icon
        className={cn(
          'mr-3 h-5 w-5 flex-shrink-0',
          isActive
            ? 'text-primary-foreground'
            : 'text-gray-400 group-hover:text-gray-500'
        )}
        aria-hidden="true"
      />
      <span>{item.name}</span>
    </div>

    {item.badge && (
      <span
        className={cn(
          'ml-3 inline-block py-0.5 px-2 text-xs rounded-full',
          isActive
            ? 'bg-primary-foreground/20 text-primary-foreground'
            : 'bg-gray-100 text-gray-600'
        )}
      >
        {item.badge}
      </span>
    )}
  </Link>
);

SidebarNavItem.displayName = 'SidebarNavItem';

export { SidebarNavItem };
