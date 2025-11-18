import { createAuthClient } from 'better-auth/vue'
export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000/api/v1/auth/', // The base URL of your auth server
})
