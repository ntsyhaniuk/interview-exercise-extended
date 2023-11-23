import styles from './Loader.module.css'

export const Loader = ({ size = 'sm', color = 'dark' }) => {

  return (
    <div className={`${styles.loader} ${styles[size]} ${styles[color]}`}></div>
  )
};