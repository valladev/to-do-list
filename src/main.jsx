import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Rotas from './routes/index.jsx'
import 'typeface-poppins';
import {Toaster} from './components/ui/toaster.tsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Rotas />
    <Toaster />
  </React.StrictMode>,
)
