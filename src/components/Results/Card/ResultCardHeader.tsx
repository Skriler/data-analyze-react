import React from 'react';
import { Clock, Database } from 'lucide-react';
import { CardTitle, CardDescription } from '@components/Ui/Card';
import { Badge } from '@components/Ui/Badge';
import type { AnalysisResultItem } from '@shared/results';
import { ResultsFormatter } from '@libs/utils/results';

interface ResultCardHeaderProps {
  resultItem: AnalysisResultItem;
  config: any;
  colorClasses: any;
}

const ResultCardHeader: React.FC<ResultCardHeaderProps> = ({
  resultItem,
  config,
  colorClasses,
}) => {
  const Icon = config.icon;

  return (
    <div className="flex items-center space-x-4">
      <div
        className={`w-14 h-14 ${colorClasses.icon} rounded-xl flex items-center justify-center shadow-sm`}
      >
        <Icon className="h-7 w-7" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center space-x-3">
          <CardTitle className="text-xl font-bold text-gray-900">
            {config.name}
          </CardTitle>
          <Badge
            variant="outline"
            className={`${colorClasses.badge} border font-medium`}
          >
            {resultItem.type}
          </Badge>
        </div>
        <CardDescription className="text-gray-600 space-y-1">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4" />
            <span className="font-medium">Dataset:</span>
            <span>{resultItem.datasetName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Completed:</span>
            <span>{ResultsFormatter.formatDate(resultItem.timestamp)}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">
              {ResultsFormatter.getRelativeTime(resultItem.timestamp)}
            </span>
          </div>
        </CardDescription>
      </div>
    </div>
  );
};

export { ResultCardHeader };
