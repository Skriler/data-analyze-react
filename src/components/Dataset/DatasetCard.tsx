import { MoreVertical, Table, BarChart3 } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { Card, CardContent } from '@components/Ui/Card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/Ui/DropdownMenu';
import type { DatasetDto } from '@api-types/dataset';
import { useAuthState } from '@hooks/api/useAuth';
import { useDeleteDataset } from '@hooks/api/useDatasets';
import { useToast } from '@hooks/toast/useToast';
import { formatDistanceToNow } from 'date-fns';

interface DatasetCardProps {
  dataset: DatasetDto;
  onView: (dataset: DatasetDto) => void;
  onAnalyze: (dataset: DatasetDto) => void;
}

const gradientColors = [
  'from-primary-100 to-accent-100',
  'from-green-100 to-emerald-100',
  'from-purple-100 to-violet-100',
  'from-orange-100 to-amber-100',
  'from-pink-100 to-rose-100',
  'from-blue-100 to-cyan-100',
];

const iconColors = [
  'text-primary-600',
  'text-green-600',
  'text-purple-600',
  'text-orange-600',
  'text-pink-600',
  'text-blue-600',
];

export function DatasetCard({ dataset, onView, onAnalyze }: DatasetCardProps) {
  const { data: authState } = useAuthState();
  const deleteDataset = useDeleteDataset();
  const { toast } = useToast();

  // Use dataset ID to consistently pick colors
  const colorIndex = dataset.Id % gradientColors.length;
  const gradientClass = gradientColors[colorIndex];
  const iconClass = iconColors[colorIndex];

  const handleDelete = async () => {
    if (!authState?.isAdmin) {
      toast({
        title: 'Permission denied',
        description: 'Only administrators can delete datasets.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await deleteDataset.mutateAsync(dataset.Id);
      toast({
        title: 'Dataset deleted',
        description: `${dataset.Name} has been successfully deleted.`,
      });
    } catch (error) {
      toast({
        title: 'Delete failed',
        description: 'An error occurred while deleting the dataset.',
        variant: 'destructive',
      });
    }
  };

  const formatSize = (objectCount: number, paramCount: number) => {
    // Rough estimation based on object and parameter count
    const estimatedKB = (objectCount * paramCount * 10) / 1024;
    if (estimatedKB < 1024) {
      return `${estimatedKB.toFixed(1)} KB`;
    }
    return `${(estimatedKB / 1024).toFixed(1)} MB`;
  };

  const createdAt = formatDistanceToNow(new Date(dataset.CreatedAt), {
    addSuffix: true,
  });

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 bg-gradient-to-r ${gradientClass} rounded-lg flex items-center justify-center`}
            >
              <Table className={`${iconClass} text-lg`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {dataset.Name}
              </h3>
              <p className="text-sm text-gray-500">Created {createdAt}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(dataset)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAnalyze(dataset)}>
                Run Analysis
              </DropdownMenuItem>
              {authState?.isAdmin && (
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-destructive"
                >
                  Delete Dataset
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Parameters:</span>
            <span className="font-medium text-gray-900">
              {dataset.Parameters.length}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Objects:</span>
            <span className="font-medium text-gray-900">
              {dataset.Objects.length.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Size:</span>
            <span className="font-medium text-gray-900">
              {formatSize(dataset.Objects.length, dataset.Parameters.length)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          {dataset.Parameters.slice(0, 3).map(param => (
            <span
              key={param.Id}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
            >
              {param.Name}
            </span>
          ))}
          {dataset.Parameters.length > 3 && (
            <span className="text-xs text-gray-500">
              +{dataset.Parameters.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            className="flex-1"
            onClick={() => onView(dataset)}
            disabled={deleteDataset.isPending}
          >
            View Dataset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAnalyze(dataset)}
            disabled={deleteDataset.isPending}
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
