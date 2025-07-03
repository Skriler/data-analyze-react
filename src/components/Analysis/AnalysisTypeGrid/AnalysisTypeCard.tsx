import React from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/Ui/Card';
import type { AnalysisType } from '@shared/types/analysisType';

interface AnalysisTypeCardProps {
  analysisType: AnalysisType;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const AnalysisTypeCard: React.FC<AnalysisTypeCardProps> = ({
  analysisType,
  isSelected,
  onSelect,
}) => {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
      }`}
      onClick={() => onSelect(analysisType.id)}
    >
      <CardHeader className="pb-3">
        <div
          className={`w-12 h-12 bg-${analysisType.color}-100 rounded-lg flex items-center justify-center mb-3`}
        >
          <analysisType.icon
            className={`h-6 w-6 text-${analysisType.color}-600`}
          />
        </div>
        <CardTitle className="text-lg">{analysisType.name}</CardTitle>
        <CardDescription className="text-sm">
          {analysisType.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
