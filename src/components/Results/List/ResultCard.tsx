import React from 'react';
import { Download, Eye, Clock, Database } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@components/Ui/Card';
import { Badge } from '@components/Ui/Badge';
import { ResultCardActions } from './ResultCardActions';
import { ResultCardHeader } from './ResultCardHeader';
import { ResultCardContent } from './ResultCardContent';
import { ANALYSIS_CONFIG, type AnalysisResultItem } from '@shared/results';
import { ResultsFormatter } from '@libs/utils/results';

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
  const colorClasses = getColorClasses(config.color);

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white shadow-sm">
      <CardHeader className={`rounded-t-lg ${colorClasses.bg}`}>
        <div className="flex items-start justify-between">
          <ResultCardHeader
            resultItem={resultItem}
            config={config}
            colorClasses={colorClasses}
          />
          <ResultCardActions
            resultItem={resultItem}
            onViewDetails={onViewDetails}
            onExport={onExport}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ResultCardContent resultItem={resultItem} />
      </CardContent>
    </Card>
  );
};
