import React from 'react';
import { Download, Eye, Clock, Database } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/Ui/Card';
import { Badge } from '@components/Ui/Badge';
import { SimilarityResultDisplay } from './SimilarityResultDisplay';
import { ClusteringResultDisplay } from './ClusteringResultDisplay';
import { ANALYSIS_CONFIG, type AnalysisResultItem } from '@shared/results';
import { FormattingUtils } from '@libs/utils/formatting';
import type { SimilarityResult, ClusteringResult } from '@api-types/analysis';

interface ResultCardProps {
  resultItem: AnalysisResultItem;
  onViewDetails: (id: string) => void;
  onExport: (id: string) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  resultItem,
  onViewDetails,
  onExport,
}) => {
  const config = ANALYSIS_CONFIG[resultItem.type];
  const Icon = config.icon;

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50 border-blue-200',
        icon: 'bg-blue-500 text-white',
        badge: 'bg-blue-100 text-blue-800 border-blue-200',
      },
      green: {
        bg: 'bg-emerald-50 border-emerald-200',
        icon: 'bg-emerald-500 text-white',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      },
      purple: {
        bg: 'bg-purple-50 border-purple-200',
        icon: 'bg-purple-500 text-white',
        badge: 'bg-purple-100 text-purple-800 border-purple-200',
      },
      orange: {
        bg: 'bg-orange-50 border-orange-200',
        icon: 'bg-orange-500 text-white',
        badge: 'bg-orange-100 text-orange-800 border-orange-200',
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const colorClasses = getColorClasses(config.color);

  const renderResult = () => {
    if (resultItem.type === 'similarity') {
      return (
        <SimilarityResultDisplay
          result={resultItem.result as SimilarityResult}
          showDetails={true}
        />
      );
    } else {
      return (
        <ClusteringResultDisplay
          result={resultItem.result as ClusteringResult}
          showDetails={true}
        />
      );
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white shadow-sm">
      <CardHeader className={`rounded-t-lg ${colorClasses.bg}`}>
        <div className="flex items-start justify-between">
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
                  <span>
                    {FormattingUtils.formatDate(resultItem.timestamp)}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">
                    {FormattingUtils.getRelativeTime(resultItem.timestamp)}
                  </span>
                </div>
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(resultItem.id)}
              className="bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 font-medium"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport(resultItem.id)}
              className="bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 font-medium"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">{renderResult()}</CardContent>
    </Card>
  );
};
