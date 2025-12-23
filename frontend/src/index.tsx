import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { initializeIcons } from '@fluentui/font-icons-mdl2'

import Chat from './pages/chat/Chat'
import Layout from './pages/layout/Layout'
import NoPage from './pages/NoPage'
import { AppStateProvider } from './state/AppProvider'
import Home from './pages/Home'
import { getMsalInstance } from './auth/msalInstance'

import './index.css'

// initializeIcons() // optional

export default function App() {
  return (
    <AppStateProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="chat" element={<Chat />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppStateProvider>
  )
}

// Handle MSAL redirect once, then render React
;(async () => {
  const msalInstance = await getMsalInstance()

  // Process the ?code=... response from AAD
  const result = await msalInstance.handleRedirectPromise().catch((err) => {
    console.error('MSAL redirect handling failed', err)
    return null
  })

  // If we just handled a successful login redirect, send user to /#/chat
  if (result && result.account) {
    // Make this account the active one
    msalInstance.setActiveAccount(result.account)

    // Force hash route to /chat
    window.location.hash = '#/chat'
  }

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})()
