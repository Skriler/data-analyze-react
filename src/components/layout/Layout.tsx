import React from 'react';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <AppHeader />
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 ml-64 p-8">{children}</main>
      </div>
    </div>
  );
};

Layout.displayName = 'Layout';

export { Layout };
