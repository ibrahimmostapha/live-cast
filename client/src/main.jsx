import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import {ThemeContextProvider} from './context/themeContext'
import { NavBarContextProvider } from './context/navBarContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
    <NavBarContextProvider>
      <App />
    </NavBarContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
)
