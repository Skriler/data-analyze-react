import { useParams, useNavigate } from 'react-router-dom';
import { useDataset, useDeleteDataset } from '@hooks/api/useDatasets';
import { useAuthState } from '@hooks/api/useAuth';
import { useToast } from '@hooks/toast';
import { formatDistanceToNow } from 'date-fns';

export function useDatasetDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: authState } = useAuthState();
  const deleteDataset = useDeleteDataset();
  const { toast } = useToast();

  const datasetId = parseInt(id || '0', 10);
  const { data: dataset, isLoading, error } = useDataset(datasetId);

  const layoutTitle = 'Dataset Details';
  const layoutSubtitle = dataset?.name || '';

  const handleAnalyze = () => {
    if (dataset) {
      navigate(`/analysis/${dataset.id}`);
    }
  };

  const handleViewResults = () => {
    if (dataset) {
      navigate(`/results/${dataset.id}`);
    }
  };

  const handleDelete = async () => {
    if (!dataset) return;

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
    } catch {
      toast({
        title: 'Delete failed',
        description: 'An error occurred while deleting the dataset.',
        variant: 'destructive',
      });
    }
  };

  const createdAt = dataset
    ? formatDistanceToNow(new Date(dataset.createdAt), { addSuffix: true })
    : '';

  const stats = dataset
    ? {
        totalObjects: dataset.objects.length,
        totalParameters: dataset.parameters.length,
        numericParameters: dataset.parameters.filter(p => p.type === 'Numeric')
          .length,
        categoricalParameters: dataset.parameters.filter(
          p => p.type === 'Categorical'
        ).length,
      }
    : null;

  const actions = {
    handleAnalyze,
    handleViewResults,
    handleDelete,
  };

  return {
    dataset,
    isLoading,
    error,
    layoutTitle,
    layoutSubtitle,
    createdAt,
    stats,
    actions,
    isAdmin: authState?.isAdmin,
  };
}
