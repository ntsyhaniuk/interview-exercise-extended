import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import debounce from 'lodash/debounce';

import { ROUTES } from '../../constants';
import { useGlobal } from '../../context';
import { useSmoothNavigate } from '../../hooks';
import { Loader, PageContainer, PageContent } from '../';
import { executeInSequence, isBase64, isValidUrl } from '../../helpers';

import styles from './StringDecode.module.css';

const errors = {
  invalidString: 'You must provide a valid Base64 string.',
  invalidUrl: 'The decoded string is not a valid URL.',
};

const description = 'You can paste an encoded link to decode it and automatically solve an exercise that is needed to join us...';

export const StringDecode = () => {
  const { state, setGlobal } = useGlobal();

  const smoothNavigate = useSmoothNavigate(useNavigate());
  
  const [encodedString, setEncodedString] = useState('');
  const [encodingError, setEncodingError] = useState('');
  const [isFakeLoading, setIsFakeLoading] = useState(false);

  const { isMobile } = state;

  const handleChange = debounce(({ target }) => {
    const { value } = target;

    if (!isBase64(value)) {
      setEncodingError(errors.invalidString);
      return;
    } else {
      setEncodingError('');
      setEncodedString(value.trim());
    }
  }, 500);

  const handleDecode = () => {

    try {
      if (!isBase64(encodedString)) {
        throw new Error(errors.invalidString);
      }

      const decodedUrl = atob(encodedString);

      if (!isValidUrl(decodedUrl)) {
        throw new Error(errors.invalidUrl);
      }

      executeInSequence([
        () => setIsFakeLoading(true),
        () => setGlobal({ decodedUrl }),
        () => setIsFakeLoading(false),
        () => smoothNavigate(ROUTES.parse),
      ], 500);
    } catch ({ message }) {
      setEncodingError(message);
    };
  };

  const ProcessButton = ({ className }) => (
    <button className={className} disabled={!encodedString || !!encodingError} onClick={handleDecode}>
      {isFakeLoading ? <Loader /> : 'Process'}
    </button>
  );

  return (
    <PageContainer>
      <PageContent>
        <h1>Pass interviews smarter</h1>
        {encodingError && <p>{encodingError}</p>}
        {!encodingError && <p>{description}</p>}
        <div className={styles.inputBox}>
          <input type="text" placeholder="here:" onChange={handleChange} />
          {!isMobile && <ProcessButton className={styles.desktopButton} />}
        </div>
        {isMobile && <ProcessButton className={styles.mobileButton} />}
      </PageContent>
    </PageContainer>
  );
};