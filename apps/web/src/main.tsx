import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import CSS stylesheets into Vite bundle for guaranteed production styling
import '../public/assets/vendor/bootstrap/css/bootstrap.min.css';
import '../public/assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../public/assets/css/style.css';
import '../public/assets/css/my-nyumba-admin.css';
import '../public/assets/css/my-nyumba-system.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
