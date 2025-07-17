import React, { createContext, useContext } from 'react';
import { DEFAULT_LAYOUT_TITLE, type LayoutContextType } from '@shared/layout';
import { useLayout } from '@hooks/features/layout/useLayout';

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

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

const useSetLayout = (title: string, subtitle?: string) => {
  const { setLayoutInfo } = useLayoutContext();

  React.useEffect(() => {
    setLayoutInfo(title, subtitle);

    return () => {
      setLayoutInfo(DEFAULT_LAYOUT_TITLE);
    };
  }, [title, subtitle, setLayoutInfo]);
};

export { LayoutProvider, useLayoutContext, useSetLayout };
