import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Ui/Card';
import { Database, Activity, TrendingUp, type LucideIcon } from 'lucide-react';

export interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  onClick?: () => void;
}

export interface QuickActionsProps {
  onCreateDataset?: () => void;
  onRunAnalysis?: () => void;
  onViewResults?: () => void;
}

const quickActionClasses = `
  p-3
  border
  border-gray-200
  rounded-lg
  hover:bg-gray-50
  cursor-pointer
  transition-colors
`;

const iconWrapperClasses = `
  w-8
  h-8
  rounded-lg
  flex
  items-center
  justify-center
`;

const QuickActionItem: React.FC<{ action: QuickAction }> = ({ action }) => (
  <div className={quickActionClasses} onClick={action.onClick}>
    <div className="flex items-center space-x-3">
      <div className={`${iconWrapperClasses} ${action.iconBgColor}`}>
        <action.icon className={`h-4 w-4 ${action.iconColor}`} />
      </div>
      <div>
        <p className="font-medium text-gray-900">{action.title}</p>
        <p className="text-sm text-gray-500">{action.description}</p>
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
        description: 'Add a new dataset for analysis',
        icon: Database,
        iconBgColor: 'bg-blue-100',
        iconColor: 'text-blue-600',
        onClick: onCreateDataset,
      },
      {
        title: 'Run Analysis',
        description: 'Analyze existing datasets',
        icon: Activity,
        iconBgColor: 'bg-green-100',
        iconColor: 'text-green-600',
        onClick: onRunAnalysis,
      },
      {
        title: 'View Results',
        description: 'Check analysis results',
        icon: TrendingUp,
        iconBgColor: 'bg-purple-100',
        iconColor: 'text-purple-600',
        onClick: onViewResults,
      },
    ],
    [onCreateDataset, onRunAnalysis, onViewResults]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
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
