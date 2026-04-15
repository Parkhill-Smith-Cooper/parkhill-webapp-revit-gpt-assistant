import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from './msalConfig'

const msalInstance = new PublicClientApplication(msalConfig)

const initPromise = msalInstance.initialize()

export const getMsalInstance = async () => {
  await initPromise
  return msalInstance
}