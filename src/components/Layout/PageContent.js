import styles from './Layout.module.css';

export const PageContent = ({ children }) => (
  <div className={styles.content}>{children}</div>
);