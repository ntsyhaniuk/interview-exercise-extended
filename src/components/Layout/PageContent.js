import styles from './Layout.module.css';

export const PageContent = ({ direction = 'column', children }) => (
  <div className={`${styles.content} ${styles[direction]}`}>{children}</div>
);