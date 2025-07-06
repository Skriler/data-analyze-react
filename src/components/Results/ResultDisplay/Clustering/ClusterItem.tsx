import React from 'react';
import { Hash } from 'lucide-react';
import { Badge } from '@components/Ui/Badge';
import { ClusterObjectsList } from './ClusterObjectsList';
import { ResultsFormatter } from '@libs/utils/results';
import type { ClusterDto } from '@api-types/analysis/clustering';

interface ClusterItemProps {
  cluster: ClusterDto;
  index: number;
}

const ClusterItem: React.FC<ClusterItemProps> = ({ cluster }) => (
  <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 hover:shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm">
          <Hash className="w-3 h-3" />
        </div>
        <h5 className="font-medium text-gray-900">{cluster.name}</h5>
      </div>
      <Badge
        variant="secondary"
        className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-300 hover:from-emerald-200 hover:to-emerald-300 font-bold text-sm px-3 py-1"
      >
        {ResultsFormatter.formatNumber(cluster.objects.length)} objects
      </Badge>
    </div>
    <ClusterObjectsList objects={cluster.objects} />
  </div>
);

export { ClusterItem };
