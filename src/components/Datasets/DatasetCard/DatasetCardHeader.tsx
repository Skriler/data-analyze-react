import { Database } from 'lucide-react';
import type { DatasetDto } from '@api-types/dataset';
import { formatDistanceToNow } from 'date-fns';

interface DatasetCardHeaderProps {
  dataset: DatasetDto;
  gradientClass: string;
  iconClass: string;
}

function DatasetCardHeader({
  dataset,
  gradientClass,
  iconClass,
}: DatasetCardHeaderProps) {
  const createdAt = formatDistanceToNow(new Date(dataset.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="flex items-start mb-6">
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
    </div>
  );
}

export { DatasetCardHeader };
