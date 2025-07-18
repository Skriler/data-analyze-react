import React from 'react';
import { Play, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/Ui/Card';
import type { AnalysisTypeConfig } from '@shared/analysis';

interface AnalysisTypeDetailsProps {
  analysisType: AnalysisTypeConfig;
}

const getAnalysisColors = (id: string) => {
  const colorMaps = {
    similarity: {
      gradient: 'from-blue-500 to-blue-600',
      lightGradient: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
      featureBg: 'bg-blue-50',
      featureBorder: 'border-blue-200',
      accent: 'text-blue-600',
    },
    kmeans: {
      gradient: 'from-green-500 to-green-600',
      lightGradient: 'from-green-50 to-green-100',
      iconBg: 'bg-green-500',
      featureBg: 'bg-green-50',
      featureBorder: 'border-green-200',
      accent: 'text-green-600',
    },
    dbscan: {
      gradient: 'from-purple-500 to-purple-600',
      lightGradient: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500',
      featureBg: 'bg-purple-50',
      featureBorder: 'border-purple-200',
      accent: 'text-purple-600',
    },
    agglomerative: {
      gradient: 'from-orange-500 to-orange-600',
      lightGradient: 'from-orange-50 to-orange-100',
      iconBg: 'bg-orange-500',
      featureBg: 'bg-orange-50',
      featureBorder: 'border-orange-200',
      accent: 'text-orange-600',
    },
  };

  return colorMaps[id as keyof typeof colorMaps] || colorMaps.similarity;
};

export const AnalysisTypeDetails: React.FC<AnalysisTypeDetailsProps> = ({
  analysisType,
}) => {
  const colors = getAnalysisColors(analysisType.id);

  return (
    <Card
      className={`border-2 border-gray-200 bg-gradient-to-br ${colors.lightGradient} shadow-lg`}
    >
      <CardHeader className="pb-6">
        <div className="flex items-center space-x-6">
          <div
            className={`w-20 h-20 ${colors.iconBg} rounded-2xl flex items-center justify-center shadow-lg`}
          >
            <analysisType.icon className="h-10 w-10 text-white" />
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <CardTitle className="text-3xl font-bold text-gray-900">
                {analysisType.name}
              </CardTitle>
              <Sparkles className={`h-6 w-6 ${colors.accent}`} />
            </div>
            <CardDescription className="text-lg text-gray-700 leading-relaxed">
              {analysisType.longDescription}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-6">
          <h4 className="font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <CheckCircle className={`h-5 w-5 ${colors.accent}`} />
            <span>Key Features</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {analysisType.features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 p-4 rounded-lg bg-white border-2 ${colors.featureBorder} shadow-sm hover:shadow-md transition-shadow duration-200`}
              >
                <div
                  className={`w-2 h-2 ${colors.iconBg} rounded-full mt-2 flex-shrink-0`}
                ></div>
                <span className="text-sm text-gray-700 font-medium leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
