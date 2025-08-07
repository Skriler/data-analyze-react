import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseModalUrlParamsProps {
  paramName: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useModalUrlParams = ({
  paramName,
  isOpen,
  setIsOpen,
}: UseModalUrlParamsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const shouldOpen = searchParams.get(paramName) === 'true';

    if (shouldOpen !== isOpen) {
      setIsOpen(shouldOpen);
    }
  }, [searchParams, paramName, isOpen, setIsOpen]);

  const handleModalChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      const newParams = new URLSearchParams(searchParams);

      if (open) {
        newParams.set(paramName, 'true');
      } else {
        newParams.delete(paramName);
      }
      setSearchParams(newParams);
    },
    [paramName, searchParams, setSearchParams, setIsOpen]
  );

  return { handleModalChange };
};
