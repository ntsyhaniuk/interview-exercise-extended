import styles from './Layout.module.css';

export const TargetContainer = ({ size = 'lg', children }) => (
  <div className={`${styles.targetContainer} ${styles[size]}`}>
    {children}
  </div>
);