import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
// eslint-disable-next-line import/no-named-as-default
import AuthContext  from './context/AuthContext';


// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
      <AuthContext>
        <App />
        </AuthContext>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
