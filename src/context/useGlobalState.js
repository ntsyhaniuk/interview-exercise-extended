import { useState } from 'react';

const defaultState = {
  flagLink: '',
  decodedUrl: '',
  capturedFlag: '',
  flagSelector: '',
};

export const useGlobalState = () => {
  const [state, setState] = useState(defaultState);

  // React Compiler stabilizes this updater; keep architectural batching in callers.
  const setGlobal = (values) => {
    setState((prev) => ({ ...prev, ...values }));
  };

  return [state, setGlobal];
};
