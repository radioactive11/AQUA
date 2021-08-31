import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Auth0ProviderWithHistory from './auth/auth0providerwithhistory';

ReactDOM.render(
		<Auth0ProviderWithHistory
    		domain={process.env.REACT_APP_AUTH0_DOMAIN}
    		clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    		redirectUri={window.location.origin}
  		>
			<App />
		</Auth0ProviderWithHistory>
,	document.getElementById('root')
);
