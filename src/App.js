import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GlobalProvider } from './context';


import { StringDecode, ParseTemplate, Loader, ErrorBoundary } from './components';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appRoot}>
      <GlobalProvider>
        <ErrorBoundary>
          <Suspense fallback={<Loader size='xl' />}>
            <Router>
              <Routes>
                <Route path='/' element={<StringDecode />} />
                <Route path='/parse' element={<ParseTemplate />} />
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
