import { FileText } from 'lucide-react';
import { SectionCard, SectionHeader } from '../Common';
import { DatasetNameField } from './DatasetNameField';

function DatasetInfoSection({ control }: { control: any }) {
  return (
    <div className="space-y-4">
      <SectionHeader
        icon={<FileText className="h-4 w-4 text-slate-600" />}
        title="Dataset Information"
      />
      <SectionCard>
        <DatasetNameField control={control} />
      </SectionCard>
    </div>
  );
}

export { DatasetInfoSection };
