import { useState, useEffect } from 'react';

export const useMediaQuery = (breakpoint) => {
  const [isMobile, setIsMobile] = useState(false);


  const handleResize = (mediaQuery) => {
    setIsMobile(mediaQuery.matches);
  };


  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    handleResize(mediaQuery);

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};