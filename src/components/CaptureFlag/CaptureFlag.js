import { useEffect } from 'react';
import { sanitize } from 'dompurify';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants';
import { useGlobal } from '../../context';
import { fetchTemplate } from '../../api';
import { Loader, PageContainer } from '../';
import { useSmoothNavigate } from '../../hooks';

import styles from './CaptureFlag.module.css';

const targetUrlKeywords = ['lambda', 'east', 'on', 'aws', 'challenge'];
const challengeLinkRegex = /https?:\/\/[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(?:\.[a-zA-Z]{2,})(?:\/[^\s\)]*)?/g;

export const CaptureFlag = () => {
  const { state, setGlobal } = useGlobal();
  const smoothNavigate = useSmoothNavigate(useNavigate());

  const {
    decodedUrl,
    capturedFlag,
    instructionsTemplate,
  } = state;

  const buildCssSelector = () => {
    let match;
    let cssSelector = '';

    const tagsRegex = /<(\w+)\s+([^>]+)>/g;
    const structureExampleRegex = /```(.*?)```/s;

    const [structureExampleString] = structureExampleRegex.exec(instructionsTemplate) ?? [];

    while ((match = tagsRegex.exec(structureExampleString)) !== null) {
      const tag = match[1];
      const attributes = match[2].split(/\s+/).map(attr => {
        const [attributeName] = attr.split('=');
        return `[${attributeName}]`;
      }).join('');
      cssSelector += `${tag}${attributes} > `;
    }

    cssSelector = cssSelector.slice(0, -3); // Remove the last ' > '

    return cssSelector;
  };

  const parseChallengeTemplate = (challengeTemplate) => {
    setGlobal({ challengeTemplate });

    const el = document.createElement('div');
    el.style.display = 'none';
    el.innerHTML = sanitize(challengeTemplate);
    document.body.appendChild(el);

    let selector = 'code[data-class] > div[data-tag] > span[data-id] > i.char'; // Default selector

    const generatedSelector = buildCssSelector();

    if (generatedSelector) {
      selector = generatedSelector;
    }

    const elements = el.querySelectorAll(selector);

    const flagLink = Array.from(elements).map(({ attributes }) => attributes.value.value).join('');

    document.body.removeChild(el);

    return flagLink;
  };

  const setFlagLink = (flagLink) => {
    setGlobal({ flagLink });

    return flagLink;
  }

  const setCapturedFlag = (capturedFlag) => {
    setGlobal({ capturedFlag });

    return capturedFlag;
  };

  const extractChallengeLink = (instructionsTemplate) => {
    setGlobal({ instructionsTemplate });

    const allLinks = [...instructionsTemplate.matchAll(challengeLinkRegex)];

    const link = allLinks.find(([url]) => targetUrlKeywords.every(kw => url.includes(kw)));

    return link;
  };

  const getTemplateString = async (url) => await fetchTemplate(url);

  const decodedUrlHandler = (url) => {
    if (url) {
      Promise.resolve(url)
        .then(getTemplateString)
        .then(extractChallengeLink)
        .then(getTemplateString)
        .then(parseChallengeTemplate)
        .then(setFlagLink)
        .then(getTemplateString)
        .then(setCapturedFlag);
    }
  };

  const handleDoMagic = () => {
    smoothNavigate(ROUTES.publish);
  };

  useEffect(() => {
    decodedUrlHandler(decodedUrl);
  }, [decodedUrl]);


  return (
    <PageContainer>
      {!capturedFlag && <Loader size='md' />}
      {capturedFlag && (
        <div className={styles.flagContainer}>
          <span className={styles.flag}>{capturedFlag}</span>
          <div className={styles.magicStickContainer}>
            <p className={styles.magicStick} onClick={handleDoMagic} />
          </div>
        </div>
      )}
    </PageContainer>
  );
};