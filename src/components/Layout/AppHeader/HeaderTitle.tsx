import React from 'react';

interface HeaderTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  title,
  subtitle,
  className = '',
}) => (
  <div className={`flex items-baseline space-x-3 ${className}`}>
    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
    {subtitle && (
      <div className="relative">
        <span className="text-sm font-medium text-gray-600">{subtitle}</span>
        <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
      </div>
    )}
  </div>
);

HeaderTitle.displayName = 'HeaderTitle';

export { HeaderTitle };
