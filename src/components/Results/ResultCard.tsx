import React from 'react';
import { Button } from '@components/Ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/Ui/Card';
import { Download, Eye } from 'lucide-react';
import { SimilarityResultDisplay } from './SimilarityResultDisplay';
import { ClusteringResultDisplay } from './ClusteringResultDisplay';
import {
  analysisTypeIcons,
  analysisTypeColors,
  analysisTypeNames,
} from './resultsConfig';
import type { AnalysisResultItem } from './types';
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
  const Icon = analysisTypeIcons[resultItem.type];
  const color = analysisTypeColors[resultItem.type];
  const typeName = analysisTypeNames[resultItem.type];

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const renderResult = () => {
    if (resultItem.type === 'similarity') {
      return (
        <SimilarityResultDisplay
          result={resultItem.result as SimilarityResult}
        />
      );
    } else {
      return (
        <ClusteringResultDisplay
          result={resultItem.result as ClusteringResult}
        />
      );
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}
            >
              <Icon className={`h-6 w-6 text-${color}-600`} />
            </div>
            <div>
              <CardTitle className="text-lg">{typeName}</CardTitle>
              <CardDescription>
                Dataset: {resultItem.datasetName} • Completed{' '}
                {formatDate(resultItem.timestamp)}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(resultItem.id)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport(resultItem.id)}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>{renderResult()}</CardContent>
    </Card>
  );
};
