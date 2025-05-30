'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializePKCE, loginUser } from '@/redux/authSlice';
import type { RootState } from '@/redux/store';
import { AppDispatch } from '@/redux/store';
import { getClientSidePKCE } from '@/utils/pkce';

export default function AuthForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, codeVerifier, codeChallenge, isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  // Client ID would typically come from environment variables
  const clientId = 'example-client-id';
  const redirectUri = typeof window !== 'undefined' ? window.location.origin : '';

  // Initialize PKCE on component mount
  useEffect(() => {
    dispatch(initializePKCE());
  }, [dispatch]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!codeVerifier || !codeChallenge) {
      console.error('PKCE not initialized');
      return;
    }

    try {
      // Get client-side PKCE functions
      const pkceClient = await getClientSidePKCE();
      
      // Step 1: Request an authorization code
      pkceClient.requestAuthorizationCode(clientId, codeChallenge, redirectUri);

      // Step 2: Simulate receiving the authorization code
      const authCode = sessionStorage.getItem('auth_code');
      
      if (!authCode) {
        console.error('No authorization code received');
        return;
      }

      // Step 3: Exchange the code for a token
      const token = await pkceClient.exchangeCodeForToken(authCode, codeVerifier, clientId, redirectUri);
      console.log('Received token:', token);
      
      // Step 4: Use the token to authenticate the user
      dispatch(loginUser({ username, password }));
    } catch (error) {
      console.error('Authentication process failed:', error);
    }
  };

  if (isAuthenticated && user) {
    return (
      <div className="max-w-md mx-auto my-8 p-6 bg-gray-900 rounded-lg shadow-xl border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-white">Авторизация успешна</h1>
        <div className="mb-4 text-gray-300">
          <p>Вы вошли как: <span className="font-semibold">{user.username}</span></p>
          <p>Роль: <span className="font-semibold">{user.role}</span></p>
        </div>
        <div className="mt-6">
          <button
            onClick={() => {
              // In a real app, you would revoke the token here
              dispatch({ type: 'auth/logout' });
            }}
            className="w-full py-2 px-4 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900"
          >
            Выйти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-gray-900 rounded-lg shadow-xl border border-gray-700">
      <h1 className="text-2xl font-bold mb-4 text-white">Авторизация</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="username">
            Имя пользователя
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <p className="mt-1 text-xs text-gray-400">
            Для тестирования используйте: admin/password или user/password
          </p>
        </div>
        
        <button
          type="submit"
          disabled={loading || !username || !password}
          className={`w-full py-2 px-4 rounded-md ${
            loading || !username || !password
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900'
          }`}
        >
          {loading ? 'Входим...' : 'Войти'}
        </button>
      </form>
    </div>
  );
} 