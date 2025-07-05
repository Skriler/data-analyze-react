import React from 'react';
import { Card, CardContent } from '@components/Ui/Card';

export const DatasetLoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="border-2 border-gray-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl skeleton"></div>
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-gray-200 rounded skeleton w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded skeleton w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded skeleton w-12"></div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-gray-200 rounded skeleton w-20"></div>
                <div className="h-4 bg-gray-200 rounded-full skeleton w-8"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-200 rounded-full skeleton w-20"></div>
                <div className="h-6 bg-gray-200 rounded-full skeleton w-24"></div>
                <div className="h-6 bg-gray-200 rounded-full skeleton w-16"></div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="h-10 bg-gray-200 rounded-lg skeleton"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
