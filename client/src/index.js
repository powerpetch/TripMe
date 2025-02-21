import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { LoadScript } from '@react-google-maps/api';
import './App.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <LoadScript
    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    libraries={['places']}>
  {/* <React.StrictMode> */}
    <Router>
      <App />
    </Router>
  {/* </React.StrictMode> */}
  </LoadScript>
);