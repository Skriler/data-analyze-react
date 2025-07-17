import React, { useState } from 'react';
import { DEFAULT_LAYOUT_TITLE } from '@shared/layout';

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
