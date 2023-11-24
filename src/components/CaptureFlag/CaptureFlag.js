import { useEffect, useState } from 'react';

import { useGlobal } from '../../context';

import { fetchTemplate } from '../../api';

const challengeLinkRegex = /https?:\/\/[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(?:\.[a-zA-Z]{2,})(?:\/[^\s\)]*)?/g;
const keywords = ['lambda', 'east', 'on', 'aws', 'challenge'];

export const CaptureFlag = () => {
  const { state, setGlobal } = useGlobal();

  const { decodedUrl, capturedFlag } = state;

  const [challengeTemplate, setChallengeTemplate] = useState('');


  const parseChallengeTemplate = () => {
    const template = document.getElementById('challengeTemplate');

    const elements = template.querySelectorAll('code[data-class] > div[data-tag] > span[data-id] > i.char');

    const flagLink = Array.from(elements).map(({ attributes }) => attributes.value.value).join('');

    return flagLink;
  };

  const resetChallengeTemplate = () => {
    setChallengeTemplate('');
  }

  const setCapturedFlag = (capturedFlag) => {
    setGlobal({ capturedFlag });
  };

  const extractChallengeLink = (templateString) => {
    const allLinks = [...templateString.matchAll(challengeLinkRegex)];

    const link = allLinks.find(([url]) => keywords.every(kw => url.includes(kw)));

    return link;
  };

  const getTemplateString = async (url) => {
    const text = await fetchTemplate(url);

    return text;
  };

  const decodedUrlHandler = (url) => {
    if (url) {
      Promise.resolve(url)
        .then(getTemplateString)
        .then(extractChallengeLink)
        .then(getTemplateString)
        .then(setChallengeTemplate);
    }
  };

  const challengeTemplateHandler = (template) => {
    if (template) {
      Promise.resolve(template)
        .then(parseChallengeTemplate)
        .then(getTemplateString)
        .then(setCapturedFlag)
        .then(resetChallengeTemplate);
    }
  };

  useEffect(() => {
    challengeTemplateHandler(challengeTemplate);
  }, [challengeTemplate]);

  useEffect(() => {
    decodedUrlHandler(decodedUrl);
  }, [decodedUrl]);

  return (
    <div>
      <h1>Captured flag is: <strong>{capturedFlag}</strong></h1>
      {challengeTemplate && <div id="challengeTemplate" dangerouslySetInnerHTML={{ __html: challengeTemplate }}></div>}
    </div>
  );
};