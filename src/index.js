import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider 
          domain= "anchetascampesinas.us.auth0.com" 
          clientId = "hYGDh1IbiefyIoldA8b1wHDlP098JIpC" 
          redirectUri={window.location.origin} >
      <App />
    </Auth0Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
