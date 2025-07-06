import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  bgColor: string;
  iconColor: string;
  textColor: string;
  borderColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  bgColor,
  iconColor,
  textColor,
  borderColor,
}) => (
  <div
    className={`bg-gradient-to-br ${bgColor} rounded-xl p-4 border ${borderColor}`}
  >
    <div className="flex items-center space-x-3">
      <div
        className={`w-10 h-10 ${iconColor} rounded-lg flex items-center justify-center`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className={`text-2xl font-bold ${textColor}`}>{value}</div>
        <div
          className={`text-sm font-medium ${textColor.replace('900', '700')}`}
        >
          {label}
        </div>
      </div>
    </div>
  </div>
);

export { StatCard };
