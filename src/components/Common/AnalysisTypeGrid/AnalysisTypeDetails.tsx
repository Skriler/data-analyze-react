import React from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/Ui/Card';
import type { AnalysisTypeConfig } from '@shared/analysis';
import { getAnalysisColors } from '@libs/utils/common/analysisTypeGrid/utils';

export interface AnalysisTypeDetailsProps {
  analysisType: AnalysisTypeConfig;
}

const AnalysisTypeDetails: React.FC<AnalysisTypeDetailsProps> = ({
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

export { AnalysisTypeDetails };
