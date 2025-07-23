import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@components/Ui/Card';
import { ResultCardActions } from './ResultCardActions';
import { ResultCardHeader } from './ResultCardHeader';
import { ResultCardContent } from './ResultCardContent';
import { ANALYSIS_CONFIG, type AnalysisResultItem } from '@shared/results';
import { ClusteringResultModal, SimilarityResultModal } from '../ResultModal';
import type {
  ClusteringAnalysisResult,
  SimilarityAnalysisResult,
} from '@api-types/analysis';
import type { DatasetDto } from '@api-types/dataset';

interface ResultCardProps {
  resultItem: AnalysisResultItem;
  dataset: DatasetDto;
}

const ResultCard: React.FC<ResultCardProps> = ({ resultItem, dataset }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const COLOR_CLASSES = {
    rose: {
      bg: 'bg-rose-50 border-rose-200',
      icon: 'bg-rose-500 text-white',
      badge: 'bg-rose-100 text-rose-800 border-rose-200',
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
  } as const;

  const config = ANALYSIS_CONFIG[resultItem.type];
  const colorClasses = COLOR_CLASSES[config.color];

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white shadow-sm">
        <CardHeader className={`rounded-t-lg ${colorClasses.bg}`}>
          <div className="flex items-start justify-between">
            <ResultCardHeader
              resultItem={resultItem}
              dataset={dataset}
              config={config}
              colorClasses={colorClasses}
            />
            <ResultCardActions onViewDetails={handleViewDetails} />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ResultCardContent resultItem={resultItem} />
        </CardContent>
      </Card>

      {resultItem.type === 'similarity' ? (
        <SimilarityResultModal
          result={resultItem.result as SimilarityAnalysisResult}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      ) : (
        <ClusteringResultModal
          result={resultItem.result as ClusteringAnalysisResult}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export { ResultCard };
