import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import CSS stylesheets into Vite bundle for guaranteed production styling
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/css/style.css';
import './assets/css/my-nyumba-admin.css';
import './assets/css/my-nyumba-system.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
