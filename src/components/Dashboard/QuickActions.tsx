import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Ui/Card';
import {
  Database,
  Activity,
  TrendingUp,
  Plus,
  type LucideIcon,
} from 'lucide-react';

export interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  gradientBg: string;
  onClick?: () => void;
}

export interface QuickActionsProps {
  onCreateDataset?: () => void;
  onRunAnalysis?: () => void;
  onViewResults?: () => void;
}

const QuickActionItem: React.FC<{ action: QuickAction }> = ({ action }) => (
  <div
    className={`
      p-4 
      ${action.gradientBg}
      border-0
      rounded-xl
      hover:shadow-lg
      hover:scale-105
      cursor-pointer
      transition-all
      duration-200
      group
    `}
    onClick={action.onClick}
  >
    <div className="flex items-center space-x-4">
      <div
        className={`
        w-12 h-12 
        rounded-xl 
        flex items-center justify-center
        ${action.iconBgColor}
        group-hover:scale-110
        transition-transform
        duration-200
        shadow-lg
      `}
      >
        <action.icon className={`h-6 w-6 ${action.iconColor}`} />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900 mb-1">{action.title}</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {action.description}
        </p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Plus className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  </div>
);

export const QuickActions: React.FC<QuickActionsProps> = ({
  onCreateDataset,
  onRunAnalysis,
  onViewResults,
}) => {
  const actions: QuickAction[] = React.useMemo(
    () => [
      {
        title: 'Create Dataset',
        description: 'Add a new dataset for comprehensive analysis',
        icon: Database,
        iconBgColor: 'bg-blue-500',
        iconColor: 'text-white',
        gradientBg: 'bg-gradient-to-r from-blue-50 to-blue-100',
        onClick: onCreateDataset,
      },
      {
        title: 'Run Analysis',
        description: 'Analyze existing datasets with advanced algorithms',
        icon: Activity,
        iconBgColor: 'bg-green-500',
        iconColor: 'text-white',
        gradientBg: 'bg-gradient-to-r from-green-50 to-green-100',
        onClick: onRunAnalysis,
      },
      {
        title: 'View Results',
        description: 'Check analysis results and generate insights',
        icon: TrendingUp,
        iconBgColor: 'bg-purple-500',
        iconColor: 'text-white',
        gradientBg: 'bg-gradient-to-r from-purple-50 to-purple-100',
        onClick: onViewResults,
      },
    ],
    [onCreateDataset, onRunAnalysis, onViewResults]
  );

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Plus className="h-5 w-5 text-blue-600" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map(action => (
            <QuickActionItem key={action.title} action={action} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
