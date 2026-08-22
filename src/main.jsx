import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UdayFoundationLanding from './Ngo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UdayFoundationLanding />
  </StrictMode>,
)
