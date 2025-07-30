import React from 'react';
import { Database, Plus } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { Card, CardContent } from '@components/Ui/Card';

const EmptyDatasetState: React.FC = () => {
  return (
    <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-300 bg-gradient-to-br from-gray-50 to-white">
      <CardContent className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <Database className="w-12 h-12 text-gray-500" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          No datasets available
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          Create your first dataset to start running analysis. Upload your data
          and begin discovering valuable insights from your information.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Create Dataset</span>
          </Button>

          {/* TODO: Implement import functionality
          <Button
            variant="outline"
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 py-3 px-6 rounded-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Upload className="h-5 w-5" />
            <span>Import</span>
          </Button>
          */}
        </div>
      </CardContent>
    </Card>
  );
};

export { EmptyDatasetState };
