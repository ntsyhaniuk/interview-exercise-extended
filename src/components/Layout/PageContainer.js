import styles from './Layout.module.css';

export const PageContainer = ({ children }) => (
  <div className={styles.container}>{children}</div>
);