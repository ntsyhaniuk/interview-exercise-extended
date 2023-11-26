import { useEffect, useState } from 'react';

import { useGlobal } from '../../context';
import { createSandbox } from '../../api';
import { PageContainer, PageContent, TargetContainer } from '../Layout';
import { appComponentTemplate } from './appComponentTemplate';
import { Loader } from '../Loader/Loader';

export const Publish = () => {
  const { state } = useGlobal();

  const { flagLink, flagSelector } = state;

  const [sandboxId, setSandboxId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);


  const publish = async () => {
    setIsLoading(true);

    try {
      const templateString = appComponentTemplate({ flagLink, flagSelector });

      const sandboxId = await createSandbox(templateString);

      setSandboxId(sandboxId);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (flagLink) {
      publish();
    }
  }, [flagLink]);

  return (
    <PageContainer>
      <PageContent>
        {isLoading && (
          <Loader size='md' />
        )}
        {error && (
          <h1>{error.message}</h1>
        )}
        {sandboxId && (
          <TargetContainer>
            <a href={`https://codesandbox.io/s/${sandboxId}`} target="_blank" rel="noreferrer">your sandbox</a>
          </TargetContainer>
        )}
      </PageContent>
    </PageContainer>
  );


};