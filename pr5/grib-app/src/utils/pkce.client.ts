/**
 * Client-side PKCE (Proof Key for Code Exchange) utility functions
 * These functions are browser-specific and should only be used in client components
 */

// Generate a random code verifier
export function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

// Generate a code challenge from the code verifier
export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(hash));
}

// Base64 URL encoding helper function
function base64UrlEncode(buffer: Uint8Array): string {
  return btoa(String.fromCharCode.apply(null, [...buffer]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Simulate authorization code request
export function requestAuthorizationCode(clientId: string, codeChallenge: string, redirectUri: string): void {
  // In a real application, this would redirect to the authorization server
  // For this simulation, we'll just log the parameters
  console.log('Authorization Code Request:', {
    client_id: clientId,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid profile',
  });
  
  // Simulate receiving an authorization code
  const authCode = 'simulated_auth_code_' + Math.random().toString(36).substring(2, 15);
  sessionStorage.setItem('auth_code', authCode);
}

// Simulate token exchange
export async function exchangeCodeForToken(
  code: string, 
  codeVerifier: string, 
  clientId: string, 
  redirectUri: string
): Promise<{
  access_token: string;
  token_type: string;
  expires_in: number;
}> {
  // In a real application, this would make a request to the token endpoint
  // For this simulation, we'll just return a mock token
  
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    access_token: 'simulated_access_token_' + Math.random().toString(36).substring(2, 15),
    token_type: 'Bearer',
    expires_in: 3600,
  };
} 