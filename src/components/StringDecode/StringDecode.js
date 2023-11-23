import { useGlobal } from '../../context';

import styles from './StringDecode.module.css';

export const StringDecode = () => {
  const { state } = useGlobal();

  console.log(state);

  return (
    <div className={styles.root}>
      <h1>Enter encoded string:</h1>
      <input type="text" value={state.decodedString} />
    </div>
  );
};