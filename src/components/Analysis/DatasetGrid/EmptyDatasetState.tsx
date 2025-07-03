import React from 'react';
import { Button } from '@components/Ui/Button';
import { Card, CardContent } from '@components/Ui/Card';
import { BarChart3 } from 'lucide-react';

export const EmptyDatasetState: React.FC = () => {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <BarChart3 className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No datasets available
        </h3>
        <p className="text-gray-500 mb-6">
          Create a dataset first to run analysis.
        </p>
        <Button variant="outline">Go to Datasets</Button>
      </CardContent>
    </Card>
  );
};
