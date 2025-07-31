import type { Control } from 'react-hook-form';

import { FileText } from 'lucide-react';
import { SectionCard, SectionHeader } from '../Common';
import { DatasetNameField } from './DatasetNameField';
import type { CreateDatasetFormData } from '@shared/dataset';
interface DatasetInfoSectionProps {
  control: Control<CreateDatasetFormData>;
}

const DatasetInfoSection: React.FC<DatasetInfoSectionProps> = ({ control }) => (
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

export { DatasetInfoSection };
