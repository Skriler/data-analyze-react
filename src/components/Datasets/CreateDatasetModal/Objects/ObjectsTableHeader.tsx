import { Grid3x3 } from 'lucide-react';

interface ObjectsTableHeaderProps {
  parameters: string[];
  minColWidth: number;
}

function ObjectsTableHeader({
  parameters,
  minColWidth,
}: ObjectsTableHeaderProps) {
  return (
    <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200 sticky top-0">
      <tr>
        <th
          className="text-left text-xs font-bold text-slate-700 px-6 py-4 uppercase tracking-wider"
          style={{ minWidth: '200px' }}
        >
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-lg bg-slate-200">
              <Grid3x3 className="h-4 w-4 text-slate-600" />
            </div>
            Object Name
          </div>
        </th>
        {parameters.map((param, index) => (
          <th
            key={index}
            className="text-left text-xs font-bold text-slate-700 px-6 py-4 uppercase tracking-wider border-l-2 border-slate-200"
            style={{ minWidth: `${minColWidth}px` }}
          >
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-sm" />
              <span className="truncate font-semibold">
                {param || `Parameter ${index + 1}`}
              </span>
            </div>
          </th>
        ))}
        <th className="w-16 px-6 py-4"></th>
      </tr>
    </thead>
  );
}

export { ObjectsTableHeader };
