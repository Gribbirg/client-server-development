/**
 * PKCE (Proof Key for Code Exchange) utility functions
 * This file serves as a bridge between server and client components
 */

// Mock implementations for server-side
export function generateCodeVerifier(): string {
  // This is a mock implementation for the server
  // In a real application, this would be handled differently
  return 'server_side_mock_verifier';
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  // This is a mock implementation for the server
  // In a real application, this would be handled differently
  return 'server_side_mock_challenge';
}

export function requestAuthorizationCode(clientId: string, codeChallenge: string, redirectUri: string): void {
  // Server-side mock
  console.log('Server-side mock for authorization code request');
}

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
  // Server-side mock
  return {
    access_token: 'server_side_mock_token',
    token_type: 'Bearer',
    expires_in: 3600,
  };
}

// Client-side implementation with dynamic import (only used in client components)
export async function getClientSidePKCE() {
  if (typeof window !== 'undefined') {
    return import('./pkce.client');
  }
  
  return {
    generateCodeVerifier,
    generateCodeChallenge,
    requestAuthorizationCode,
    exchangeCodeForToken,
  };
} 