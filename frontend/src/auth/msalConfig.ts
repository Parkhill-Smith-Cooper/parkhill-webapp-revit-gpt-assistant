//// filepath: d:\GitHub\parkhill-webapp-revit-gpt-assistant\frontend\src\auth\msalConfig.ts
import { Configuration, RedirectRequest } from '@azure/msal-browser'

// ids
const tenantId = 'c51ba1f1-61d1-4a1f-a173-bcf2c9a570ff'
const clientId = 'd049f682-8cd1-45e2-9068-e69c4a378737'

// IMPORTANT: must exactly match AAD redirect URI
const redirectUri = window.location.origin + '/'   // e.g. http://localhost:5173/

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri,
    postLogoutRedirectUri: redirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
}

export const loginRequest: RedirectRequest = {
  scopes: ['openid', 'profile', 'email'],
}