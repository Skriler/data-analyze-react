import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Ui/Card';
import { Settings } from 'lucide-react';
import type { AnalysisTypeConfig } from '@shared/analysis';
import { getAnalysisColors } from '@libs/utils/common/analysisTypeGrid/utils';

interface StepsProps {
  analysisType: AnalysisTypeConfig;
  steps: Array<{
    title: string;
    description: string;
  }>;
}

const Steps: React.FC<StepsProps> = ({ analysisType, steps }) => {
  const colors = getAnalysisColors(analysisType.id);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Settings className="h-6 w-6 text-slate-600" />
          <CardTitle className="text-xl font-bold text-slate-900">
            How It Works
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div
                className={`w-8 h-8 rounded-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
              >
                {index + 1}
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  {step.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { Steps };
