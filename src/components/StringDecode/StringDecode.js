import { useState } from 'react';

import debounce from 'lodash/debounce';

import { useGlobal } from '../../context';

import { executeInSequence } from '../../helpers';

import { Loader } from '../Loader';

import styles from './StringDecode.module.css';

const description = 'You can paste an encoded link to decode it and automatically solve an exercise that is needed to join us...';

export const StringDecode = () => {
  const { setGlobal } = useGlobal();

  const [encodedString, setEncodedString] = useState('');
  const [isFakeLoading, setIsFakeLoading] = useState(false);

  const handleChange = debounce(({ target }) => {
    const { value } = target;

    setEncodedString(value);
  }, 500);

  const handleDecode = () => {
    const decodedString = atob(encodedString);

    executeInSequence([
      () => setIsFakeLoading(true),
      () => setGlobal({ decodedString }),
      () => setIsFakeLoading(false),
      () => {
        const { pathname } = window.location;

        if (pathname === '/') {
          window.location.href = decodedString;
        }
      }
    ], 500);
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Pass interviews smarter</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.inputBox}>
          <input type="text" placeholder="here:" onChange={handleChange} />
          <button onClick={handleDecode}>
            {isFakeLoading ? <Loader /> : 'Process'}
          </button>
        </div>
      </div>
    </div>
  );
};