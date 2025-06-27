import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface NavigationButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  variant?: 'primary' | 'secondary';
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  icon: Icon,
  label,
  variant = 'primary',
}) => {
  const baseClasses = `
    flex items-center justify-center gap-2 
    px-6 py-3 
    text-white font-semibold 
    rounded-xl 
    shadow-lg hover:shadow-xl 
    transform hover:scale-105 
    transition-all duration-200
  `;

  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    secondary: 'bg-gray-500 hover:bg-gray-600',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );
};

export { NavigationButton };
