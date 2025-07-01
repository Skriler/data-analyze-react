import React from 'react';
import { Button } from '@components/Ui/Button';
import { Card, CardContent } from '@components/Ui/Card';
import { BarChart3 } from 'lucide-react';

interface EmptyResultsStateProps {
  onGoToAnalysis: () => void;
}

export const EmptyResultsState: React.FC<EmptyResultsStateProps> = ({
  onGoToAnalysis,
}) => {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
          <BarChart3 className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No analysis results yet
        </h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Run some analysis on your datasets to see detailed results and
          insights here.
        </p>
        <Button
          onClick={onGoToAnalysis}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          Go to Analysis
        </Button>
      </CardContent>
    </Card>
  );
};
