import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueriesContextProvider } from './context/QueryContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueriesContextProvider>
        <App />
      </QueriesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);