import React from 'react';
import { AppHeader } from '../AppHeader';
import { AppSidebar } from '../AppSidebar';
import { useLayoutContext } from './LayoutContext';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  const { title, subtitle } = useLayoutContext();

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 ${className}`}
    >
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <AppHeader title={title} subtitle={subtitle} />
      </div>

      {/* Layout Container */}
      <div className="flex pt-16">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-16 bottom-0 z-20">
          <AppSidebar />
        </div>
        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 min-h-screen">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

Layout.displayName = 'Layout';

export { Layout };
