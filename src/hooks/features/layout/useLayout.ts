import React, { useContext, useState } from 'react';
import { DEFAULT_LAYOUT_TITLE } from '@shared/layout';
import { LayoutContext } from '@components/Layout/Containers';

export const useLayout = () => {
  const [title, setTitle] = useState(DEFAULT_LAYOUT_TITLE);
  const [subtitle, setSubtitle] = useState<string | undefined>();

  const setLayoutInfo = React.useCallback(
    (newTitle: string, newSubtitle?: string) => {
      setTitle(newTitle);
      setSubtitle(newSubtitle);
    },
    []
  );

  const resetLayoutInfo = React.useCallback(() => {
    setTitle(DEFAULT_LAYOUT_TITLE);
    setSubtitle(undefined);
  }, []);

  return {
    title,
    subtitle,
    setLayoutInfo,
    resetLayoutInfo,
  };
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

export const useSetLayout = (title: string, subtitle?: string) => {
  const { setLayoutInfo } = useLayoutContext();

  React.useEffect(() => {
    setLayoutInfo(title, subtitle);

    return () => {
      setLayoutInfo(DEFAULT_LAYOUT_TITLE);
    };
  }, [title, subtitle, setLayoutInfo]);
};
