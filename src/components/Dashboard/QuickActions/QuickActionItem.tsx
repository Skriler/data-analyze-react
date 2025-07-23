import React from 'react';
import type { QuickAction } from '@shared/dashboard';

interface QuickActionItemProps {
  action: QuickAction;
}

const QuickActionItem: React.FC<QuickActionItemProps> = ({ action }) => (
  <div
    className={`p-4 ${action.gradientBg} border-0 rounded-xl hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-200 group`}
    onClick={action.onClick}
  >
    <div className="flex items-center space-x-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.iconBgColor} group-hover:scale-110 transition-transform duration-200 shadow-lg`}
      >
        <action.icon className={`h-6 w-6 ${action.iconColor}`} />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900 mb-1">{action.title}</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {action.description}
        </p>
      </div>
    </div>
  </div>
);

export { QuickActionItem };
