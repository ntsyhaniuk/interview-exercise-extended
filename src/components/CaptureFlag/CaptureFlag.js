import { useEffect, useCallback, useRef } from 'react';
import { sanitize } from 'dompurify';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants';
import { useGlobal } from '../../context';
import { fetchTemplate } from '../../api';
import { useSmoothNavigate } from '../../hooks';
import { Loader, PageContainer, TargetContainer } from '../';

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
    const attributes = match[2].split(/\s+/).map((attr) => {
      const [attributeName] = attr.split('=');
      return `[${attributeName}]`;
    }).join('');
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

  const { decodedUrl, capturedFlag } = state;

  const decodedUrlHandler = useCallback(async (url) => {
    if (!url || isRunningRef.current) return;

    isRunningRef.current = true;

    try {
      const instructionsTemplate = await fetchTemplate(url);
      const challengeLink = extractChallengeLink(instructionsTemplate);

      if (!challengeLink) {
        return;
      }

      const challengeTemplate = await fetchTemplate(challengeLink);
      const { flagSelector, flagLink } = parseChallengeTemplate(
        challengeTemplate,
        instructionsTemplate
      );

      const capturedFlagValue = await fetchTemplate(flagLink);

      setGlobal({
        flagSelector,
        flagLink,
        capturedFlag: capturedFlagValue,
      });
    } finally {
      isRunningRef.current = false;
    }
  }, [setGlobal]);

  const handleDoMagic = useCallback(() => {
    smoothNavigate(ROUTES.publish);
  }, [smoothNavigate]);

  useEffect(() => {
    decodedUrlHandler(decodedUrl);
  }, [decodedUrl, decodedUrlHandler]);

  return (
    <PageContainer>
      {!capturedFlag && <Loader size="md" />}
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
