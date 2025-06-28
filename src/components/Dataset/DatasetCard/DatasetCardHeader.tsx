import { MoreVertical, Table } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/Ui/DropdownMenu';
import type { DatasetDto } from '@api-types/dataset';
import { formatDistanceToNow } from 'date-fns';

interface DatasetCardHeaderProps {
  dataset: DatasetDto;
  gradientClass: string;
  iconClass: string;
  isAdmin: boolean;
  onView: (dataset: DatasetDto) => void;
  onAnalyze: (dataset: DatasetDto) => void;
  onDelete: () => void;
}

function DatasetCardHeader({
  dataset,
  gradientClass,
  iconClass,
  isAdmin,
  onView,
  onAnalyze,
  onDelete,
}: DatasetCardHeaderProps) {
  const createdAt = formatDistanceToNow(new Date(dataset.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div
          className={`w-12 h-12 bg-gradient-to-r ${gradientClass} rounded-lg flex items-center justify-center shadow-sm`}
        >
          <Table className={`${iconClass} h-6 w-6`} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-base mb-1">
            {dataset.name}
          </h3>
          <p className="text-xs text-gray-500">Created {createdAt}</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onView(dataset)}>
            View Dataset
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAnalyze(dataset)}>
            Run Analysis
          </DropdownMenuItem>
          {isAdmin && (
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              Delete Dataset
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { DatasetCardHeader };
