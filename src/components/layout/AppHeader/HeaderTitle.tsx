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
  <div className={`flex items-center space-x-4 ${className}`}>
    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
    {subtitle && (
      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
        {subtitle}
      </span>
    )}
  </div>
);

HeaderTitle.displayName = 'HeaderTitle';

export { HeaderTitle };
