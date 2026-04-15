import { Configuration } from '@azure/msal-browser'

const tenantId = 'c51ba1f1-61d1-4a1f-a173-bcf2c9a570ff'
const clientId = 'd049f682-8cd1-45e2-9068-e69c4a378737'

// SAME for local and prod: origin + '/'
const redirectUri = window.location.origin + '/'  // e.g. http://localhost:5173/ or https://revit-gpt-assistant.azurewebsites.net/

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