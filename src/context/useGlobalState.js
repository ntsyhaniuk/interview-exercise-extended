import { useState } from 'react';

export const useGlobalState = () => {
  const [state, setState] = useState({ decodedString: '' });

  const setGlobal = (values) => {
    setState(prev => ({ ...prev, ...values }));
  };

  return [state, setGlobal];
};