import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UserProvider } from './providers/UserContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './providers/ThemeContext.tsx'
import { MobileProvider } from './providers/MobileContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <MobileProvider>
            <ThemeProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </ThemeProvider>
        </MobileProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
