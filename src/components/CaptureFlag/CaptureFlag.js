import { useEffect, useRef, useState } from 'react';
import { sanitize } from 'dompurify';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants';
import { useGlobal } from '../../context';
import { fetchTemplate } from '../../api';
import { useSmoothNavigate } from '../../hooks';
import { Loader, PageContainer, PageContent, TargetContainer } from '../';

import styles from './CaptureFlag.module.css';

const targetUrlKeywords = ['lambda', 'east', 'on', 'aws', 'challenge'];
const challengeLinkRegex = /https?:\/\/[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(?:\.[a-zA-Z]{2,})(?:\/[^\s)]*)?/g;
const DEFAULT_FLAG_SELECTOR = 'section[data-id^="92"] article[data-class$="45"] div[data-tag*="78"] > b.ref';

const buildCssSelector = (instructionsTemplate) => {
  let match;
  let cssSelector = '';

  const tagsRegex = /<(\w+)\s+([^>]+)>/g;
  const structureExampleRegex = /```(.*?)```/s;

  const [structureExampleString] = structureExampleRegex.exec(instructionsTemplate) ?? [];

  while ((match = tagsRegex.exec(structureExampleString)) !== null) {
    const tag = match[1];
    const attributes = match[2]
      .split(/\s+/)
      .map((attr) => {
        const [attributeName] = attr.split('=');
        return `[${attributeName}]`;
      })
      .join('');
    cssSelector += `${tag}${attributes} > `;
  }

  return cssSelector.slice(0, -3);
};

const extractChallengeLink = (instructionsTemplate) => {
  const allLinks = [...instructionsTemplate.matchAll(challengeLinkRegex)];
  const link = allLinks.find(([url]) => targetUrlKeywords.every((kw) => url.includes(kw)));
  return link?.[0];
};

const parseChallengeTemplate = (challengeTemplate, instructionsTemplate) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitize(challengeTemplate), 'text/html');

  const generatedSelector = buildCssSelector(instructionsTemplate);
  const flagSelector = generatedSelector || DEFAULT_FLAG_SELECTOR;
  const elements = doc.querySelectorAll(flagSelector);
  const flagLink = Array.from(elements)
    .map(({ attributes }) => attributes.value?.value)
    .filter(Boolean)
    .join('');

  return { flagSelector, flagLink };
};

export const CaptureFlag = () => {
  const { state, setGlobal } = useGlobal();
  const navigate = useNavigate();
  const smoothNavigate = useSmoothNavigate(navigate);
  const isRunningRef = useRef(false);
  const [error, setError] = useState(null);

  const { decodedUrl, capturedFlag } = state;

  const decodedUrlHandler = async (url) => {
    if (isRunningRef.current) return;

    if (!url) {
      setError('No decoded URL found. Go back and process a valid Base64 string first.');
      return;
    }

    isRunningRef.current = true;
    setError(null);

    try {
      const instructionsTemplate = await fetchTemplate(url);
      const challengeLink = extractChallengeLink(instructionsTemplate);

      if (!challengeLink) {
        throw new Error('Could not find a challenge link in the instructions template.');
      }

      const challengeTemplate = await fetchTemplate(challengeLink);
      const { flagSelector, flagLink } = parseChallengeTemplate(
        challengeTemplate,
        instructionsTemplate
      );

      if (!flagLink) {
        throw new Error('Could not assemble the flag URL from the challenge DOM.');
      }

      const capturedFlagValue = await fetchTemplate(flagLink);

      setGlobal({
        flagSelector,
        flagLink,
        capturedFlag: capturedFlagValue,
      });
    } catch (err) {
      setError(err?.message || 'Failed to capture the flag.');
    } finally {
      isRunningRef.current = false;
    }
  };

  const handleDoMagic = () => {
    smoothNavigate(ROUTES.publish);
  };

  const handleRetry = () => {
    decodedUrlHandler(decodedUrl);
  };

  const handleBack = () => {
    smoothNavigate(ROUTES.home);
  };

  useEffect(() => {
    decodedUrlHandler(decodedUrl);
    // decodedUrlHandler is compiler-memoized; decodedUrl is the intentional trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedUrl]);

  return (
    <PageContainer>
      {!capturedFlag && !error && <Loader size="md" />}
      {error && (
        <PageContent>
          <h1>Something went wrong</h1>
          <p>{error}</p>
          <div className={styles.actions}>
            <button type="button" onClick={handleRetry}>
              Retry
            </button>
            <button type="button" onClick={handleBack}>
              Back
            </button>
          </div>
        </PageContent>
      )}
      {capturedFlag && (
        <TargetContainer>
          <span>{capturedFlag}</span>
          <div className={styles.magicStickContainer}>
            <p className={styles.magicStick} onClick={handleDoMagic} />
          </div>
        </TargetContainer>
      )}
    </PageContainer>
  );
};
