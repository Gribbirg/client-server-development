'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializePKCE, registerUser } from '@/redux/authSlice';
import type { RootState } from '@/redux/store';
import { AppDispatch } from '@/redux/store';
import { getClientSidePKCE } from '@/utils/pkce';

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { loading, error, codeVerifier, codeChallenge, isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const clientId = 'example-client-id';
  const redirectUri = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    dispatch(initializePKCE());
  }, [dispatch]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
      
    if (password !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
      return;
    } else {
      setPasswordError('');
    }

    if (!codeVerifier || !codeChallenge) {
      console.error('PKCE not initialized');
      return;
    }

    try {
      dispatch(registerUser({ username, password, email }));
    } catch (error) {
      console.error('Registration process failed:', error);
    }
  };

  if (isAuthenticated && user) {
    return (
      <div className="max-w-md mx-auto my-8 p-6 bg-gray-900 rounded-lg shadow-xl border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-white">Регистрация успешна</h1>
        <div className="mb-4 text-gray-300">
          <p>Вы зарегистрированы как: <span className="font-semibold">{user.username}</span></p>
          {user.email && <p>Email: <span className="font-semibold">{user.email}</span></p>}
        </div>
        <div className="mt-6">
          <button
            onClick={() => {
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
      <h1 className="text-2xl font-bold mb-4 text-white">Регистрация</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleRegister}>
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
        
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
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
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="confirmPassword">
            Подтверждение пароля
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {passwordError && (
            <p className="mt-1 text-xs text-red-400">
              {passwordError}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading || !username || !password || !confirmPassword || !email}
          className={`w-full py-2 px-4 rounded-md ${
            loading || !username || !password || !confirmPassword || !email
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900'
          }`}
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
        
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => dispatch({ type: 'auth/setAuthMode', payload: 'login' })}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Уже есть аккаунт? Войти
          </button>
        </div>
      </form>
    </div>
  );
} 