import { useState } from 'react';

import { useMediaQuery } from '../hooks';
import { MOBILE_BREAKPOINT } from '../constants';

const defaultState = {
  isMobile: false,
  flagLink: '',
  decodedUrl: '',
  capturedFlag: '',
  instructionsTemplate: '',
};

export const useGlobalState = () => {
  const [state, setState] = useState(defaultState);

  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  const setGlobal = (values) => {
    setState(prev => ({ ...prev, ...values }));
  };

  return [{ ...state, isMobile }, setGlobal];
};