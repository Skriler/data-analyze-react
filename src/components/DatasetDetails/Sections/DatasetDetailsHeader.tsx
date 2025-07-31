import { Database, BarChart3, Eye } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { Card, CardContent } from '@components/Ui/Card';
import type { DatasetDto } from '@api-types/dataset';
import type { DatasetActions } from '@shared/datasetDetails';

interface DatasetDetailsHeaderProps {
  dataset: DatasetDto;
  createdAt: string;
  actions: DatasetActions;
}

const DatasetDetailsHeader: React.FC<DatasetDetailsHeaderProps> = ({
  dataset,
  createdAt,
  actions,
}) => {
  return (
    <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
              <Database className="text-blue-600 h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {dataset.name}
              </h1>
              <p className="text-sm text-gray-500">Created {createdAt}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={actions.handleAnalyze}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Run Analysis</span>
            </Button>

            <Button
              onClick={actions.handleViewResults}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>View Results</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { DatasetDetailsHeader };
