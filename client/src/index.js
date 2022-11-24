import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';
import { CurrentUserProvider } from './components/CurrentUserContext';
import { MatchedProvider } from './components/MatchedContext';

const {REACT_APP_AUTH0_DOMAIN} = process.env
const {REACT_APP_AUTH0_CLIENT_ID} = process.env


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Auth0Provider
      domain={REACT_APP_AUTH0_DOMAIN}
      clientId={REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      >
        <CurrentUserProvider>
          <MatchedProvider>
      <App />
      </MatchedProvider>
      </CurrentUserProvider>
    </Auth0Provider>
  </React.StrictMode>
);
