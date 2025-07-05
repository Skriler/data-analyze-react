import { MoreVertical, Database } from 'lucide-react';
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
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center space-x-4">
        <div
          className={`w-14 h-14 bg-gradient-to-br ${gradientClass} rounded-2xl flex items-center justify-center shadow-sm`}
        >
          <Database className={`${iconClass} h-7 w-7`} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            {dataset.name}
          </h3>
          <p className="text-sm text-gray-500">Created {createdAt}</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white border-gray-200 shadow-lg"
        >
          <DropdownMenuItem
            onClick={() => onView(dataset)}
            className="hover:bg-gray-50"
          >
            View Dataset
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onAnalyze(dataset)}
            className="hover:bg-gray-50"
          >
            Run Analysis
          </DropdownMenuItem>
          {isAdmin && (
            <DropdownMenuItem
              onClick={onDelete}
              className="text-red-600 hover:bg-red-50"
            >
              Delete Dataset
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { DatasetCardHeader };
