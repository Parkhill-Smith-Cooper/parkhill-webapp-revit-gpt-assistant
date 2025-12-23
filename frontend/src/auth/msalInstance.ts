//// filepath: d:\GitHub\parkhill-webapp-revit-gpt-assistant\frontend\src\auth\msalInstance.ts
import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from './msalConfig'

const msalInstance = new PublicClientApplication(msalConfig)

const initPromise = msalInstance.initialize()

export const getMsalInstance = async () => {
  await initPromise
  return msalInstance
}