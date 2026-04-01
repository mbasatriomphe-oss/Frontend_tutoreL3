import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './Context/StoreContext.jsx'  // 👈 Importez le Provider (avec default import)

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>  {/* 👈 Utilisez StoreContextProvider au lieu de StoreContext */}
      <App/>
    </StoreContextProvider>
  </BrowserRouter>
)