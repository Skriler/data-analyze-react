import React from 'react';
import { createPortal } from 'react-dom';
import { Dialog, DialogContent } from '@components/Ui/Dialog';
import {
  DocumentationModalHeader,
  DocumentationModalContent,
} from './Sections';
import { useDocumentationModal } from '@hooks/features/analysis/documentation';

interface DocumentationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAnalysisType?: string;
  onAnalysisTypeChange?: (type: string) => void;
}

const DocumentationModal: React.FC<DocumentationModalProps> = ({
  open,
  onOpenChange,
  selectedAnalysisType = 'similarity',
  onAnalysisTypeChange,
}) => {
  const { selectedAnalysisType: modalAnalysisType, handleAnalysisTypeChange } =
    useDocumentationModal({
      selectedAnalysisType,
      onAnalysisTypeChange,
    });

  const modalContent = (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black/50 backdrop-blur-sm overflow-hidden">
        <div className="bg-white rounded-lg h-[95vh] flex flex-col">
          <DocumentationModalHeader />

          <DocumentationModalContent
            selectedAnalysisType={modalAnalysisType}
            onAnalysisTypeChange={handleAnalysisTypeChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );

  return createPortal(modalContent, document.body);
};

export { DocumentationModal };
