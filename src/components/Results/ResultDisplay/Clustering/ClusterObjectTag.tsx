import React from 'react';
import { ResultsFormatter } from '@libs/utils/results';
import type { DataObjectClusteringAnalysisDto } from '@api-types/analysis';

interface ClusterObjectTagProps {
  object: DataObjectClusteringAnalysisDto;
  onClick?: () => void;
}

const ClusterObjectTag: React.FC<ClusterObjectTagProps> = ({
  object,
  onClick,
}) => (
  <span
    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors cursor-default"
    title={object.name}
    onClick={onClick}
  >
    {ResultsFormatter.truncateText(object.name, 20)}
  </span>
);

export { ClusterObjectTag };
