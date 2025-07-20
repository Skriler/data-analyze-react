import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@components/Ui/Button';

interface ResultCardActionsProps {
  onViewDetails: () => void;
}

const ResultCardActions: React.FC<ResultCardActionsProps> = ({
  onViewDetails,
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onViewDetails}
      className="bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 font-medium"
    >
      <Eye className="h-4 w-4 mr-2" />
      View Details
    </Button>
  );
};

export { ResultCardActions };
