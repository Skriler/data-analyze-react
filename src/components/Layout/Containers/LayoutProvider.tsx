import React, { createContext } from 'react';
import { type LayoutContextType } from '@shared/layout';
import { useLayout } from '@hooks/features/layout';

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined
);

const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { title, subtitle, setLayoutInfo } = useLayout();

  return (
    <LayoutContext.Provider value={{ title, subtitle, setLayoutInfo }}>
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutProvider };
