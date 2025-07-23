import { Card, CardContent } from '@components/Ui/Card';
import type { DatasetDto } from '@api-types/dataset';
import { DatasetCardHeader } from './DatasetCardHeader';
import { DatasetCardStats } from './DatasetCardStats';
import { DatasetCardTags } from './DatasetCardTags';
import { DatasetCardActions } from './DatasetCardActions';

interface DatasetCardProps {
  dataset: DatasetDto;
  onView: (dataset: DatasetDto) => void;
}

const gradientColors = [
  'from-blue-50 to-blue-100',
  'from-green-50 to-green-100',
  'from-purple-50 to-purple-100',
  'from-orange-50 to-orange-100',
  'from-pink-50 to-pink-100',
  'from-cyan-50 to-cyan-100',
];

const iconColors = [
  'text-blue-600',
  'text-green-600',
  'text-purple-600',
  'text-orange-600',
  'text-pink-600',
  'text-cyan-600',
];

function DatasetCard({ dataset, onView }: DatasetCardProps) {
  const colorIndex = dataset.id % gradientColors.length;
  const gradientClass = gradientColors[colorIndex];
  const iconClass = iconColors[colorIndex];

  return (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <DatasetCardHeader
          dataset={dataset}
          gradientClass={gradientClass}
          iconClass={iconClass}
        />

        <DatasetCardStats dataset={dataset} />
        <DatasetCardTags dataset={dataset} />

        <DatasetCardActions dataset={dataset} onView={onView} />
      </CardContent>
    </Card>
  );
}

export { DatasetCard };
