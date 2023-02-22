import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import 'tw-elements';
import { ThemeProvider } from "@material-tailwind/react";
import App from './App';
import { UserAuthContextProvider } from './Context/UserAuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
       <UserAuthContextProvider>
           <App />
       </UserAuthContextProvider>
    </ThemeProvider>
  
  </React.StrictMode>
);


