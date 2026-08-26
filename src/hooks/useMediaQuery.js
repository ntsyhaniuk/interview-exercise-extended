import { useSyncExternalStore } from 'react';

const getServerSnapshot = () => false;

export const useMediaQuery = (breakpoint) => {
  const query = `(max-width: ${breakpoint}px)`;

  const subscribe = (onStoreChange) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener('change', onStoreChange);
    return () => mediaQuery.removeEventListener('change', onStoreChange);
  };

  const getSnapshot = () => window.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
