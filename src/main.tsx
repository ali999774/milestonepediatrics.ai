import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { initAnalytics } from './lib/analytics'

const container = document.getElementById('root')!

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
)

// Built pages ship prerendered markup, so hydrate it. In `vite dev` the root is
// empty, so fall back to a normal client render there.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}

initAnalytics()
