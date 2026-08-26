import { useCallback } from 'react';
import { flushSync } from 'react-dom';

export const useTransitionApi = (callback) => {
  return useCallback((...args) => {
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        flushSync(() => callback(...args));
      });
    } else {
      callback(...args);
    }
  }, [callback]);
};
