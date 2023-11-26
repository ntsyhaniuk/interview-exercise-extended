import { useGlobal } from '../../context';

import styles from './Layout.module.css';

export const TargetContainer = ({ children }) => {
  const { state } = useGlobal();

  const { isMobile } = state;

  const size = isMobile ? 'md' : 'lg';

  return (
    <div className={`${styles.targetContainer} ${styles[size]}`}>
      {children}
    </div>
  )
};