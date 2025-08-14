import React from 'react';
import { Database, BarChart3, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Ui/Card';
import type { AnalysisTypeConfig } from '@shared/analysis';
import { getAnalysisColors } from '@libs/utils/common/analysisTypeGrid/utils';

interface OverviewProps {
  analysisType: AnalysisTypeConfig;
  documentation: {
    overview: string;
    dataType: string;
    outputType: string;
    complexity: string;
  };
}

const Overview: React.FC<OverviewProps> = ({ analysisType, documentation }) => {
  const colors = getAnalysisColors(analysisType.id);

  return (
    <Card
      className={`border-2 ${colors.border} bg-gradient-to-br ${colors.lightGradient}`}
    >
      <CardHeader>
        <div className="flex items-center space-x-3">
          <analysisType.icon className={`h-6 w-6 ${colors.accent}`} />
          <CardTitle className="text-xl font-bold text-slate-900">
            {analysisType.name} Overview
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-700 leading-relaxed mb-4">
          {documentation.overview}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
            <Database className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium text-sm">Data Type</p>
              <p className="text-xs text-slate-600">{documentation.dataType}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
            <BarChart3 className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium text-sm">Output</p>
              <p className="text-xs text-slate-600">
                {documentation.outputType}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
            <Play className="h-5 w-5 text-purple-500" />
            <div>
              <p className="font-medium text-sm">Complexity</p>
              <p className="text-xs text-slate-600">
                {documentation.complexity}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { Overview };
