import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ROUTES } from './constants';
import { GlobalProvider } from './context';
import { StringDecode, CaptureFlag, Publish, Loader, ErrorBoundary } from './components';

import styles from './App.module.css';

const { home, parse, publish } = ROUTES;

function App() {
  return (
    <div className={styles.appRoot}>
      <GlobalProvider>
        <ErrorBoundary>
          <Suspense fallback={<Loader size='xl' />}>
            <Router>
              <Routes>
                <Route path={home} element={<StringDecode />} />
                <Route path={parse} element={<CaptureFlag />} />
                <Route path={publish} element={<Publish />} />
                <Route path='*' element={<StringDecode />} />
              </Routes>
            </Router>
          </Suspense>
        </ErrorBoundary>
      </GlobalProvider>
    </div>
  );
}

export default App;
