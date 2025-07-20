import { Form } from '@components/Ui/Form';
import { Dialog, DialogContent } from '@components/Ui/Dialog';
import { ModalHeader, ModalFooter } from './Modal';
import { ParametersCard } from './Parameters';
import { DatasetInfoSection } from './DatasetInfo';
import { ObjectsCard } from './Objects';
import { useCreateDatasetModal } from '@hooks/features/datasets';

interface CreateDatasetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CreateDatasetModal({ open, onOpenChange }: CreateDatasetModalProps) {
  const hookData = useCreateDatasetModal({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[95vh] flex flex-col bg-gradient-to-br from-slate-50 to-white border-0 shadow-2xl">
        <ModalHeader />

        <div className="flex-1 overflow-y-auto min-h-0 px-2">
          <Form {...hookData.form}>
            <form className="space-y-8 py-2">
              <DatasetInfoSection control={hookData.form.control} />
              <ParametersCard {...hookData} />
              <ObjectsCard {...hookData} />
            </form>
          </Form>
        </div>

        <ModalFooter {...hookData} onCancel={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

export { CreateDatasetModal };
