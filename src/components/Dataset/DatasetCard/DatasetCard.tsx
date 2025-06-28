import { Card, CardContent } from '@components/Ui/Card';
import type { DatasetDto } from '@api-types/dataset';
import { useAuthState } from '@hooks/api/useAuth';
import { useDeleteDataset } from '@hooks/api/useDatasets';
import { useToast } from '@hooks/toast/useToast';
import { DatasetCardHeader } from './DatasetCardHeader';
import { DatasetCardStats } from './DatasetCardStats';
import { DatasetCardTags } from './DatasetCardTags';
import { DatasetCardActions } from './DatasetCardActions';

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

function DatasetCard({ dataset, onView, onAnalyze }: DatasetCardProps) {
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

  return (
    <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <DatasetCardHeader
          dataset={dataset}
          gradientClass={gradientClass}
          iconClass={iconClass}
          isAdmin={authState?.isAdmin || false}
          onView={onView}
          onAnalyze={onAnalyze}
          onDelete={handleDelete}
        />

        <DatasetCardStats dataset={dataset} />
        <DatasetCardTags dataset={dataset} />

        <DatasetCardActions
          dataset={dataset}
          onView={onView}
          onAnalyze={onAnalyze}
          isDeleting={deleteDataset.isPending}
        />
      </CardContent>
    </Card>
  );
}

export { DatasetCard };
