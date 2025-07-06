import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  bgColor: 'blue' | 'emerald' | 'purple';
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  icon: Icon,
  value,
  label,
  bgColor,
}) => {
  const COLOR_CLASSES = {
    blue: {
      gradient: 'from-blue-50 to-blue-100',
      border: 'border-blue-200',
      iconBg: 'bg-blue-500',
      value: 'text-blue-900',
      label: 'text-blue-700',
    },
    emerald: {
      gradient: 'from-emerald-50 to-emerald-100',
      border: 'border-emerald-200',
      iconBg: 'bg-emerald-500',
      value: 'text-emerald-900',
      label: 'text-emerald-700',
    },
    purple: {
      gradient: 'from-purple-50 to-purple-100',
      border: 'border-purple-200',
      iconBg: 'bg-purple-500',
      value: 'text-purple-900',
      label: 'text-purple-700',
    },
  };

  const colors = COLOR_CLASSES[bgColor];

  return (
    <div
      className={`bg-gradient-to-br ${colors.gradient} rounded-xl p-6 border ${colors.border}`}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 ${colors.iconBg} rounded-lg flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className={`text-2xl font-bold ${colors.value}`}>{value}</div>
          <div className={`text-sm font-medium ${colors.label}`}>{label}</div>
        </div>
      </div>
    </div>
  );
};

export { SummaryCard };
