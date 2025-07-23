import React from 'react';
import { BarChart3, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { Card, CardContent } from '@components/Ui/Card';

interface EmptyResultsStateProps {
  onGoToAnalysis: () => void;
}

const EmptyResultsState: React.FC<EmptyResultsStateProps> = ({
  onGoToAnalysis,
}) => {
  return (
    <Card className="border-0 shadow-sm bg-white border-gray-100">
      <CardContent className="text-center py-16 px-8">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <BarChart3 className="w-12 h-12 text-blue-500" />
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h3 className="text-2xl font-bold text-gray-900">
              No analysis results yet
            </h3>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Run some analysis on your datasets to see detailed results and
            insights here. Start exploring patterns and relationships in your
            data.
          </p>

          <div className="pt-4">
            <Button
              onClick={onGoToAnalysis}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <span>Go to Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { EmptyResultsState };
