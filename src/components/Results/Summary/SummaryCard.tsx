import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  bgColor: 'blue' | 'emerald' | 'purple';
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  icon: Icon,
  value,
  label,
  bgColor,
}) => {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200 bg-blue-500 text-blue-900 text-blue-700',
    emerald:
      'from-emerald-50 to-emerald-100 border-emerald-200 bg-emerald-500 text-emerald-900 text-emerald-700',
    purple:
      'from-purple-50 to-purple-100 border-purple-200 bg-purple-500 text-purple-900 text-purple-700',
  };

  const colors = colorClasses[bgColor];
  const [
    gradientFrom,
    gradientTo,
    borderColor,
    iconBg,
    valueColor,
    labelColor,
  ] = colors.split(' ');

  return (
    <div
      className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl p-6 border ${borderColor}`}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
          <div className={`text-sm font-medium ${labelColor}`}>{label}</div>
        </div>
      </div>
    </div>
  );
};
