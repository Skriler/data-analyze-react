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

  const colorIndex = dataset.id % gradientColors.length;
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
      await deleteDataset.mutateAsync(dataset.id);
      toast({
        title: 'Dataset deleted',
        description: `${dataset.name} has been successfully deleted.`,
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
    const estimatedKB = (objectCount * paramCount * 10) / 1024;
    if (estimatedKB < 1024) {
      return `${estimatedKB.toFixed(1)} KB`;
    }
    return `${(estimatedKB / 1024).toFixed(1)} MB`;
  };

  const createdAt = formatDistanceToNow(new Date(dataset.createdAt), {
    addSuffix: true,
  });

  return (
    <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
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
              {authState?.isAdmin && (
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-600"
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
              {dataset.parameters.length}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Objects:</span>
            <span className="font-medium text-gray-900">
              {dataset.objects.length.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Size:</span>
            <span className="font-medium text-gray-900">
              {formatSize(dataset.objects.length, dataset.parameters.length)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {dataset.parameters.slice(0, 3).map(param => (
            <span
              key={param.id}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
            >
              {param.name}
            </span>
          ))}
          {dataset.parameters.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-500">
              +{dataset.parameters.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            className="flex-1 text-sm"
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
            className="px-3"
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
