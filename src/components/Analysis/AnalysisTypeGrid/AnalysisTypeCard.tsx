import React from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/Ui/Card';
import type { AnalysisTypeConfig } from '@shared/analysis';

interface AnalysisTypeCardProps {
  analysisType: AnalysisTypeConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const getCardColorClasses = (id: string, isSelected: boolean) => {
  const colorMaps = {
    similarity: {
      gradient: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      selectedBorder: 'border-blue-500',
      selectedBg: 'bg-blue-50',
      selectedRing: 'ring-blue-200',
      icon: 'text-blue-600',
      selectedIcon: 'text-white',
      title: 'text-blue-700',
    },
    kmeans: {
      gradient: 'from-green-500 to-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      selectedBorder: 'border-green-500',
      selectedBg: 'bg-green-50',
      selectedRing: 'ring-green-200',
      icon: 'text-green-600',
      selectedIcon: 'text-white',
      title: 'text-green-700',
    },
    dbscan: {
      gradient: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      selectedBorder: 'border-purple-500',
      selectedBg: 'bg-purple-50',
      selectedRing: 'ring-purple-200',
      icon: 'text-purple-600',
      selectedIcon: 'text-white',
      title: 'text-purple-700',
    },
    agglomerative: {
      gradient: 'from-orange-500 to-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      selectedBorder: 'border-orange-500',
      selectedBg: 'bg-orange-50',
      selectedRing: 'ring-orange-200',
      icon: 'text-orange-600',
      selectedIcon: 'text-white',
      title: 'text-orange-700',
    },
  };

  return colorMaps[id as keyof typeof colorMaps] || colorMaps.similarity;
};

export const AnalysisTypeCard: React.FC<AnalysisTypeCardProps> = ({
  analysisType,
  isSelected,
  onSelect,
}) => {
  const colors = getCardColorClasses(analysisType.id, isSelected);

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 transform ${
        isSelected
          ? `${colors.selectedBorder} ${colors.selectedBg} shadow-lg ring-4 ${colors.selectedRing}`
          : `${colors.border} hover:${colors.selectedBorder} ${colors.bg} hover:shadow-xl`
      }`}
      onClick={() => onSelect(analysisType.id)}
    >
      <CardHeader className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div
            className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isSelected
                ? `bg-gradient-to-r ${colors.gradient} shadow-lg transform scale-110`
                : `bg-white border-2 ${colors.border} hover:${colors.selectedBorder}`
            }`}
          >
            <analysisType.icon
              className={`h-8 w-8 transition-colors duration-300 ${
                isSelected ? colors.selectedIcon : colors.icon
              }`}
            />
          </div>

          <div className="space-y-2">
            <CardTitle
              className={`text-lg font-semibold transition-colors duration-300 ${
                isSelected ? colors.title : 'text-gray-900'
              }`}
            >
              {analysisType.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 leading-relaxed">
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
