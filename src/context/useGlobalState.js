import { useState, useCallback } from 'react';

const defaultState = {
  flagLink: '',
  decodedUrl: '',
  capturedFlag: '',
  flagSelector: '',
};

export const useGlobalState = () => {
  const [state, setState] = useState(defaultState);

  const setGlobal = useCallback((values) => {
    setState((prev) => ({ ...prev, ...values }));
  }, []);

  return [state, setGlobal];
};
