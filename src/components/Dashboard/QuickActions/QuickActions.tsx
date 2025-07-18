import React from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Ui/Card';
import { QuickActionItem } from './QuickActionItem';
import type { QuickActionsCallbacks } from '@shared/dashboard';
import { createQuickActions } from '@libs/utils/dashboard/utils';

export interface QuickActionsProps extends QuickActionsCallbacks {}

const QuickActions: React.FC<QuickActionsProps> = ({
  onCreateDataset,
  onRunAnalysis,
  onViewResults,
}) => {
  const actions = React.useMemo(() => {
    return createQuickActions({
      onCreateDataset,
      onRunAnalysis,
      onViewResults,
    });
  }, [onCreateDataset, onRunAnalysis, onViewResults]);

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
