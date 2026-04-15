import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { initializeIcons } from '@fluentui/font-icons-mdl2'

import Chat from './pages/chat/Chat'
import Layout from './pages/layout/Layout'
import NoPage from './pages/NoPage'
import { AppStateProvider } from './state/AppProvider'
import { getMsalInstance } from './auth/msalInstance'

import './index.css'

initializeIcons('https://res.cdn.office.net/files/fabric-cdn-prod_20241209.001/assets/icons/')

export default function App() {
  return (
    <AppStateProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Chat />} />
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

  // 1) Handle redirect response (when coming back from login)
  const result = await msalInstance.handleRedirectPromise().catch((err) => {
    console.error('MSAL redirect handling failed', err)
    return null
  })

  if (result && result.account) {
    // Just logged in via redirect
    msalInstance.setActiveAccount(result.account)
  } else {
    // 2) No redirect just happened – check if user is already signed in
    const accounts = msalInstance.getAllAccounts()
    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0])
    }
  }

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})()
