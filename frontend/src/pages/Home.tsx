import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '../auth/msalConfig'
import { getMsalInstance } from '../auth/msalInstance'

const Home: React.FC = () => {
  const navigate = useNavigate()

  // If user is already logged in, skip Home and go straight to /chat
  useEffect(() => {
    ;(async () => {
      const msalInstance = await getMsalInstance()
      const accounts = msalInstance.getAllAccounts()
      if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0])
        navigate('/chat', { replace: true })
      }
    })()
  }, [navigate])

  const handleLogin = async () => {
    try {
      const msalInstance = await getMsalInstance()
      await msalInstance.loginRedirect(loginRequest)
    } catch (e) {
      console.error('MSAL login failed', e)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f7fafc',
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Welcome to the Parkhill Revit AI Assistant
      </h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
        Please sign in with your Parkhill account to continue.
      </p>
      <button
        type="button"
        onClick={handleLogin}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#3182ce',
          color: '#fff',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
      >
        Login with Azure AD
      </button>
    </div>
  )
}

export default Home