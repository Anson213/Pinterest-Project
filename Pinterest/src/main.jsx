import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
 import { ShowPageProvider } from './contexts/show-page-context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <ShowPageProvider>
      <App />
    </ShowPageProvider>
  </StrictMode>
  </BrowserRouter>
)
