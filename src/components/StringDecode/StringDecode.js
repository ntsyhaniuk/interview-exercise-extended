import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import debounce from 'lodash/debounce';

import { useGlobal } from '../../context';

import { useSmoothNavigate } from '../../hooks';

import { executeInSequence } from '../../helpers';

import { Loader, PageContainer, PageContent } from '../';

import styles from './StringDecode.module.css';

const description = 'You can paste an encoded link to decode it and automatically solve an exercise that is needed to join us...';

const testString = 'aHR0cHM6Ly90bnM0bHBnbXppaXlwbnh4emVsNXNzNW55dTBuZnRvbC5sYW1iZGEtdXJsLnVzLWVhc3QtMS5vbi5hd3MvcmFtcC1jaGFsbGVuZ2UtaW5zdHJ1Y3Rpb25zLw==';

export const StringDecode = () => {
  const { setGlobal } = useGlobal();
  const smoothNavigate = useSmoothNavigate(useNavigate());

  const [encodedString, setEncodedString] = useState('');
  const [isFakeLoading, setIsFakeLoading] = useState(false);

  const handleChange = debounce(({ target }) => {
    const { value } = target;

    setEncodedString(value);
  }, 500);

  const handleDecode = () => {
    const decodedUrl = atob(encodedString);

    console.log(decodedUrl);

    executeInSequence([
      () => setIsFakeLoading(true),
      () => setGlobal({ decodedUrl }),
      () => setIsFakeLoading(false),
      () => smoothNavigate('/parse'),
    ], 500);
  };

  return (
    <PageContainer>
      <PageContent>
        <h1>Pass interviews smarter</h1>
        <p>{description}</p>
        <div className={styles.inputBox}>
          <input type="text" placeholder="here:" value={testString} onChange={handleChange} />
          <button onClick={handleDecode}>
            {isFakeLoading ? <Loader /> : 'Process'}
          </button>
        </div>
      </PageContent>
    </PageContainer>
  );
};