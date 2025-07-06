import React from 'react';
import { Download, Eye } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import type { AnalysisResultItem } from '@shared/results';

interface ResultCardActionsProps {
  resultItem: AnalysisResultItem;
  onViewDetails: (id: string) => void;
  onExport: (id: string) => void;
}

const ResultCardActions: React.FC<ResultCardActionsProps> = ({
  resultItem,
  onViewDetails,
  onExport,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onViewDetails(resultItem.id)}
        className="bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 font-medium"
      >
        <Eye className="h-4 w-4 mr-2" />
        View Details
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onExport(resultItem.id)}
        className="bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 font-medium"
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
  );
};

export { ResultCardActions };
