import styles from './GenericErrorWrapper.module.css';

export const GenericErrorWrapper = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>Something went wrong.</h1>
        <p>Try refreshing the page.</p>
      </div>
    </div>
  );
};