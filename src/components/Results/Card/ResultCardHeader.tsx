import React from 'react';
import { Clock, Database, type LucideIcon } from 'lucide-react';
import { CardTitle, CardDescription } from '@components/Ui/Card';
import type { AnalysisResultItem } from '@shared/results';
import { ResultsFormatter } from '@libs/utils/results';
import type { DatasetDto } from '@api-types/dataset';

interface ResultCardHeaderProps {
  resultItem: AnalysisResultItem;
  dataset: DatasetDto;
  config: {
    icon: LucideIcon;
    color: string;
    name: string;
    description: string;
  };
  colorClasses: {
    bg: string;
    icon: string;
    badge: string;
  };
}

const ResultCardHeader: React.FC<ResultCardHeaderProps> = ({
  resultItem,
  dataset,
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
        </div>
        <CardDescription className="text-gray-600 space-y-1">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4" />
            <span className="font-medium">Dataset:</span>
            <span>{dataset.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Completed:</span>
            <span>
              {ResultsFormatter.formatDate(resultItem.result.createdAt)}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">
              {ResultsFormatter.getRelativeTime(resultItem.result.createdAt)}
            </span>
          </div>
        </CardDescription>
      </div>
    </div>
  );
};

export { ResultCardHeader };
