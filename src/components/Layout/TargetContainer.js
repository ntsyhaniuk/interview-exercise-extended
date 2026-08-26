import { MOBILE_BREAKPOINT } from '../../constants';
import { useMediaQuery } from '../../hooks';

import styles from './Layout.module.css';

export const TargetContainer = ({ children }) => {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const size = isMobile ? 'md' : 'lg';

  return (
    <div className={`${styles.targetContainer} ${styles[size]}`}>
      {children}
    </div>
  );
};
