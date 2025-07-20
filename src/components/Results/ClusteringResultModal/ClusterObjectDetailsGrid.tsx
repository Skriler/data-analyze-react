import React from 'react';
import { MapPin } from 'lucide-react';
import { ResultsFormatter } from '@libs/utils/results';
import type { DataObjectClusteringAnalysisDto } from '@api-types/analysis';

interface ClusterObjectDetailsGridProps {
  objects: DataObjectClusteringAnalysisDto[];
}

const ClusterObjectDetailsGrid: React.FC<ClusterObjectDetailsGridProps> = ({
  objects,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto custom-scrollbar">
      {objects.map((obj, index) => (
        <div
          key={index}
          className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-gray-900 text-sm leading-tight">
              {ResultsFormatter.truncateText(obj.name, 25)}
            </h4>
            <div className="flex items-center space-x-1 text-xs text-gray-500 ml-2 flex-shrink-0">
              <MapPin className="w-3 h-3" />
              <span>
                ({obj.x}, {obj.y})
              </span>
            </div>
          </div>

          {obj.parameterValues &&
            Object.keys(obj.parameterValues).length > 0 && (
              <div className="space-y-1">
                {Object.entries(obj.parameterValues)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-gray-500 truncate flex-shrink-0 mr-2">
                        {ResultsFormatter.truncateText(key, 15)}:
                      </span>
                      <span className="text-gray-700 font-medium truncate">
                        {ResultsFormatter.truncateText(value, 20)}
                      </span>
                    </div>
                  ))}
                {Object.keys(obj.parameterValues).length > 3 && (
                  <div className="text-xs text-gray-400 italic">
                    +{Object.keys(obj.parameterValues).length - 3} more
                    parameters
                  </div>
                )}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export { ClusterObjectDetailsGrid };
