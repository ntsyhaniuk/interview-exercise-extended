import { useCallback } from 'react';

import { useTransitionApi } from './useTransitionApi';

export const useSmoothNavigate = (navigate) => {
  const smoothNavigate = useTransitionApi(navigate);

  return useCallback((...args) => {
    smoothNavigate(...args);
  }, [smoothNavigate]);
};
