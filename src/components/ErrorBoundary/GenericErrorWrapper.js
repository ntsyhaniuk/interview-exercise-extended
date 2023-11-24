import { PageContainer, PageContent } from '../Layout';

export const GenericErrorWrapper = () => {
  return (
    <PageContainer>
      <PageContent>
        <h1>Something went wrong.</h1>
        <p>Try refreshing the page.</p>
      </PageContent>
    </PageContainer>
  );
}