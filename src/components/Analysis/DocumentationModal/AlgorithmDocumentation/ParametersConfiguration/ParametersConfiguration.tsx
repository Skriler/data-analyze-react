import React from 'react';
import { Settings, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@components/Ui/Card';
import { ParameterCard } from './ParameterCard';
import type { ParameterDoc } from '@shared/analysis/documentation';

interface ParametersConfigurationProps {
  commonParameters: ParameterDoc[];
  algorithmParameters: ParameterDoc[];
}

const ParametersConfiguration: React.FC<ParametersConfigurationProps> = ({
  commonParameters,
  algorithmParameters,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Settings className="h-6 w-6 text-slate-600" />
          <CardTitle className="text-xl font-bold text-slate-900">
            Parameter Configuration
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Common Parameters */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Common Parameters</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonParameters.map((param, index) => (
                <ParameterCard key={index} param={param} variant="common" />
              ))}
            </div>
          </div>

          {/* Algorithm Specific Parameters */}
          {algorithmParameters.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                <Settings className="h-5 w-5 text-purple-500" />
                <span>Algorithm Specific Parameters</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {algorithmParameters.map((param, index) => (
                  <ParameterCard
                    key={index}
                    param={param}
                    variant="algorithm"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { ParametersConfiguration };
