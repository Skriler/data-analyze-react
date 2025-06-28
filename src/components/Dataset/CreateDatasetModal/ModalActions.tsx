import { Button } from '@components/Ui/Button';

interface ModalActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

function ModalActions({ onCancel, onSubmit, isSubmitting }: ModalActionsProps) {
  return (
    <div className="flex items-center justify-end space-x-4 pt-4 border-t">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Dataset'}
      </Button>
    </div>
  );
}

export { ModalActions };
