import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import debounce from 'lodash/debounce';

import { ROUTES, MOBILE_BREAKPOINT } from '../../constants';
import { useGlobal } from '../../context';
import { useSmoothNavigate, useMediaQuery } from '../../hooks';
import { Loader, PageContainer, PageContent } from '../';
import { executeInSequence, isBase64, isValidUrl } from '../../helpers';

import styles from './StringDecode.module.css';

const errors = {
  invalidString: 'You must provide a valid Base64 string.',
  invalidUrl: 'The decoded string is not a valid URL.',
};

const description = 'You can paste an encoded link to decode it and automatically solve an exercise that is needed to join us...';

export const StringDecode = () => {
  const { setGlobal } = useGlobal();

  const navigate = useNavigate();
  const smoothNavigate = useSmoothNavigate(navigate);
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  const [encodedString, setEncodedString] = useState('');
  const [encodingError, setEncodingError] = useState('');
  const [isFakeLoading, setIsFakeLoading] = useState(false);

  // Keep explicit debounce identity + cancel; lodash timers are not a React Compiler concern.
  const handleChange = useMemo(
    () =>
      debounce(({ target }) => {
        const { value } = target;

        if (!isBase64(value)) {
          setEncodingError(errors.invalidString);
          return;
        }

        setEncodingError('');
        setEncodedString(value.trim());
      }, 500),
    []
  );

  useEffect(() => () => handleChange.cancel(), [handleChange]);

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
    }
  };

  const processButton = (
    <button
      className={isMobile ? styles.mobileButton : styles.desktopButton}
      disabled={!encodedString || !!encodingError}
      onClick={handleDecode}
    >
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
          {!isMobile && processButton}
        </div>
        {isMobile && processButton}
      </PageContent>
    </PageContainer>
  );
};
