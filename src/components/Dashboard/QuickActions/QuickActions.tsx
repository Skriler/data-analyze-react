import React from 'react';
import { Database, Activity, TrendingUp, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Ui/Card';
import { QuickActionItem } from './QuickActionItem';
import type { QuickAction, QuickActionsCallbacks } from './ActionTypes';

export interface QuickActionsProps extends QuickActionsCallbacks {}

const QuickActions: React.FC<QuickActionsProps> = ({
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

export { QuickActions };
