import React from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/Ui/Card';
import type { AnalysisTypeConfig } from '@shared/analysis';
import type { AnalysisCardVariant } from '@shared/common/analysisTypeGrid';
import {
  getAnalysisColors,
  getVariantClasses,
} from '@libs/utils/common/analysisTypeGrid/utils';

export interface AnalysisTypeCardProps {
  analysisType: AnalysisTypeConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
  variant?: AnalysisCardVariant;
}

const AnalysisTypeCard: React.FC<AnalysisTypeCardProps> = ({
  analysisType,
  isSelected,
  onSelect,
  variant = 'default',
}) => {
  const colors = getAnalysisColors(analysisType.id);
  const classes = getVariantClasses(variant);

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${classes.card} border-2 transform ${
        isSelected
          ? `${colors.selectedBorder} ${colors.selectedBg} shadow-lg ring-4 ${colors.selectedRing}`
          : `${colors.border} hover:${colors.selectedBorder} ${colors.bg} hover:shadow-xl`
      }`}
      onClick={() => onSelect(analysisType.id)}
    >
      <CardHeader className={classes.header}>
        <div
          className={`flex flex-col items-center text-center ${classes.spacing}`}
        >
          <div
            className={`${classes.iconSize} rounded-xl flex items-center justify-center transition-all duration-300 ${
              isSelected
                ? `bg-gradient-to-r ${colors.gradient} shadow-lg transform scale-110`
                : `bg-white border-2 ${colors.border} hover:${colors.selectedBorder}`
            }`}
          >
            <analysisType.icon
              className={`${classes.iconInner} transition-colors duration-300 ${
                isSelected ? colors.selectedIcon : colors.icon
              }`}
            />
          </div>

          <div className="space-y-2">
            <CardTitle
              className={`${classes.title} font-semibold transition-colors duration-300 ${
                isSelected ? colors.title : 'text-gray-900'
              }`}
            >
              {analysisType.name}
            </CardTitle>
            <CardDescription
              className={`${classes.description} text-gray-600 leading-relaxed`}
            >
              {analysisType.description}
            </CardDescription>
          </div>

          {isSelected && (
            <div className="w-full pt-2">
              <div
                className={`h-1 rounded-full bg-gradient-to-r ${colors.gradient}`}
              ></div>
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export { AnalysisTypeCard };
