import React from 'react';

interface UseCaseListProps {
  items: string[];
  type: 'best' | 'limitations';
}

const UseCaseList: React.FC<UseCaseListProps> = ({ items, type }) => (
  <ul className="space-y-2">
    {items.map((item, index) => (
      <li key={index} className="flex items-start space-x-2">
        <div
          className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
            type === 'best' ? 'bg-green-500' : 'bg-orange-500'
          }`}
        ></div>
        <span className="text-sm text-slate-600">{item}</span>
      </li>
    ))}
  </ul>
);

export { UseCaseList };
