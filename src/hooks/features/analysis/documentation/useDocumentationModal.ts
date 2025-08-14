import { useState, useEffect } from 'react';

interface UseDocumentationModalProps {
  selectedAnalysisType: string;
  onAnalysisTypeChange?: (type: string) => void;
}

export const useDocumentationModal = ({
  selectedAnalysisType,
  onAnalysisTypeChange,
}: UseDocumentationModalProps) => {
  const [modalAnalysisType, setModalAnalysisType] =
    useState<string>(selectedAnalysisType);

  useEffect(() => {
    setModalAnalysisType(selectedAnalysisType);
  }, [selectedAnalysisType]);

  const handleAnalysisTypeChange = (type: string) => {
    setModalAnalysisType(type);
    if (onAnalysisTypeChange) {
      onAnalysisTypeChange(type);
    }
  };

  return {
    selectedAnalysisType: modalAnalysisType,
    handleAnalysisTypeChange,
  };
};
