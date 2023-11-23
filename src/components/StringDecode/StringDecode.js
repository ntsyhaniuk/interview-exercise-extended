import { useState } from 'react';

import debounce from 'lodash/debounce';

import { useGlobal } from '../../context';

import styles from './StringDecode.module.css';

export const StringDecode = () => {
  const { state, setGlobal } = useGlobal();

  const [encodedString, setEncodedString] = useState('');

  const { decodedString } = state;

  const handleChange = debounce(({ target }) => {
    const { value } = target;

    setEncodedString(value);
  }, 500);

  const handleDecode = () => {
    const decodedString = atob(encodedString);

    setGlobal({ decodedString });
  };

  return (
    <div className={styles.root}>
      <h1>Enter encoded string:</h1>
      <input type="text" onChange={handleChange} />
      <button onClick={handleDecode}>Process it!</button>
      <p>encoded::__{encodedString}</p>
      <div>
        <p>decoded::</p>
        <a href={decodedString} target="_blank">{decodedString}</a>
      </div>
    </div>
  );
};