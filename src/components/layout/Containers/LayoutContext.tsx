import React, { createContext, useContext, useState } from 'react';

interface LayoutContextType {
  title: string;
  subtitle?: string;
  setLayoutInfo: (title: string, subtitle?: string) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [title, setTitle] = useState('Data Analysis Platform');
  const [subtitle, setSubtitle] = useState<string | undefined>();

  const setLayoutInfo = (newTitle: string, newSubtitle?: string) => {
    setTitle(newTitle);
    setSubtitle(newSubtitle);
  };

  return (
    <LayoutContext.Provider value={{ title, subtitle, setLayoutInfo }}>
      {children}
    </LayoutContext.Provider>
  );
};

const useSetLayout = (title: string, subtitle?: string) => {
  const { setLayoutInfo } = useLayout();

  React.useEffect(() => {
    setLayoutInfo(title, subtitle);

    return () => {
      setLayoutInfo('Data Analysis Platform');
    };
  }, [title, subtitle, setLayoutInfo]);
};

export { LayoutProvider, useLayout, useSetLayout };
