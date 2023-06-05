import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ThemeProvider } from '@material-tailwind/react'
import { UserAuthContextProvider } from './Common/UserAuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider>
        <UserAuthContextProvider>
          <App />
        </UserAuthContextProvider>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
