import styles from './Layout.module.css';

export const PageContainer = ({ className, children }) => (
  <div className={`${className} ${styles.container}`}>{children}</div>
);