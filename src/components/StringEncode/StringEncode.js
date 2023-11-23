import { useGlobal } from '../../context';

import styles from './StringEncode.module.css';

export const StringEncode = () => {
  const { state } = useGlobal();

  console.log(state);

  return (
    <div className={styles.root}>
      <h1>Enter encoded string:</h1>
      <input type="text" value={state.decodedString} />
    </div>
  );
};