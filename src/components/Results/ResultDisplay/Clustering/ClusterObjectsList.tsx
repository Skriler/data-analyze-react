import React from 'react';
import { ClusterObjectTag } from './ClusterObjectTag';
import { ResultsFormatter } from '@libs/utils/results';
import type { DataObjectClusteringAnalysisDto } from '@api-types/analysis';

interface ClusterObjectsListProps {
  objects: DataObjectClusteringAnalysisDto[];
  maxVisible?: number;
}

const ClusterObjectsList: React.FC<ClusterObjectsListProps> = ({
  objects,
  maxVisible = 10,
}) => {
  const visibleObjects = objects.slice(0, maxVisible);
  const remainingCount = objects.length - maxVisible;

  return (
    <div className="flex flex-wrap gap-2">
      {visibleObjects.map((obj, objIndex) => (
        <ClusterObjectTag key={objIndex} object={obj} />
      ))}
      {remainingCount > 0 && (
        <span className="px-3 py-1 text-gray-500 text-xs font-medium bg-gray-50 rounded-full border border-gray-200">
          +{ResultsFormatter.formatNumber(remainingCount)} more
        </span>
      )}
    </div>
  );
};

export { ClusterObjectsList };
