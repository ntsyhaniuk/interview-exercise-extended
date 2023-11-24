import { useState } from 'react';

const defaultState = {
  decodedUrl: '',
  capturedFlag: '',
};

export const useGlobalState = () => {
  const [state, setState] = useState(defaultState);

  const setGlobal = (values) => {
    setState(prev => ({ ...prev, ...values }));
  };

  return [state, setGlobal];
};