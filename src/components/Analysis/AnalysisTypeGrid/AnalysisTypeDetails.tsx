import React from 'react';
import { Button } from '@components/Ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/Ui/Card';
import { Play } from 'lucide-react';
import type { AnalysisType } from '@shared/types/analysisType';

interface AnalysisTypeDetailsProps {
  analysisType: AnalysisType;
  hasDatasets: boolean;
}

export const AnalysisTypeDetails: React.FC<AnalysisTypeDetailsProps> = ({
  analysisType,
  hasDatasets,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div
            className={`w-16 h-16 bg-${analysisType.color}-100 rounded-lg flex items-center justify-center`}
          >
            <analysisType.icon
              className={`h-8 w-8 text-${analysisType.color}-600`}
            />
          </div>
          <div>
            <CardTitle className="text-2xl">{analysisType.name}</CardTitle>
            <CardDescription className="text-base mt-1">
              {analysisType.longDescription}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Key Features</h4>
            <ul className="space-y-2">
              {analysisType.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Select a dataset below to run {analysisType.name.toLowerCase()}
              </p>
              <Button
                disabled={!hasDatasets}
                className="flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Run Analysis</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
