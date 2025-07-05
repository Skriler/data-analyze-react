import { Database, MoreVertical, Eye, BarChart3, Trash2 } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/Ui/DropdownMenu';
import { Card, CardContent } from '@components/Ui/Card';
import type { DatasetDto } from '@api-types/dataset';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDeleteDataset } from '@hooks/api/useDatasets';
import { useAuthState } from '@hooks/api/useAuth';
import { useToast } from '@hooks/toast/useToast';

interface DatasetDetailsHeaderProps {
  dataset: DatasetDto;
}

function DatasetDetailsHeader({ dataset }: DatasetDetailsHeaderProps) {
  const navigate = useNavigate();
  const { data: authState } = useAuthState();
  const deleteDataset = useDeleteDataset();
  const { toast } = useToast();

  const createdAt = formatDistanceToNow(new Date(dataset.createdAt), {
    addSuffix: true,
  });

  const handleAnalyze = () => {
    navigate(`/analysis/${dataset.id}`);
  };

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
      navigate('/datasets');
    } catch (error) {
      toast({
        title: 'Delete failed',
        description: 'An error occurred while deleting the dataset.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
              <Database className="text-blue-600 h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {dataset.name}
              </h1>
              <p className="text-sm text-gray-500">Created {createdAt}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={handleAnalyze}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Run Analysis</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem
                  onClick={() => navigate(`/results/${dataset.id}`)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Results
                </DropdownMenuItem>
                {authState?.isAdmin && (
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Dataset
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { DatasetDetailsHeader };
