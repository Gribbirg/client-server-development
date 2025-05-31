import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getClientSidePKCE } from '@/utils/pkce';
import { saveUser, validateUser, userExists, initializeUserStorage } from '@/utils/userStorage';

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    username: string;
    role: string;
    email?: string;
  } | null;
  loading: boolean;
  error: string | null;
  codeVerifier: string | null;
  codeChallenge: string | null;
  authMode: 'login' | 'register';
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  codeVerifier: null,
  codeChallenge: null,
  authMode: 'login',
};

// Async thunk for generating PKCE code verifier and challenge
export const initializePKCE = createAsyncThunk(
  'auth/initializePKCE',
  async () => {
    if (typeof window === 'undefined') {
      return { verifier: null, challenge: null };
    }
    
    try {
      // Инициализируем хранилище пользователей при первой загрузке
      initializeUserStorage();
      
      const pkceClient = await getClientSidePKCE();
      const verifier = pkceClient.generateCodeVerifier();
      const challenge = await pkceClient.generateCodeChallenge(verifier);
      return { verifier, challenge };
    } catch (error) {
      console.error('Failed to initialize PKCE:', error);
      return { verifier: null, challenge: null };
    }
  }
);

// Async thunk for authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Проверяем учетные данные пользователя в localStorage
      const user = validateUser(username, password);
      
      if (user) {
        return { username: user.username, role: user.role, email: user.email };
      } else {
        return rejectWithValue('Неверное имя пользователя или пароль');
      }
    } catch (error) {
      return rejectWithValue('Ошибка аутентификации');
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password, email }: { username: string; password: string; email: string }, { rejectWithValue }) => {
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Проверяем, существует ли пользователь
      if (userExists(username)) {
        return rejectWithValue('Пользователь с таким именем уже существует');
      }
      
      // Сохраняем нового пользователя
      saveUser(username, password, email, 'user');
      
      // Возвращаем данные нового пользователя
      return { username, role: 'user', email };
    } catch (error) {
      return rejectWithValue('Ошибка регистрации');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setAuthMode: (state, action) => {
      state.authMode = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializePKCE.fulfilled, (state, action) => {
        state.codeVerifier = action.payload.verifier;
        state.codeChallenge = action.payload.challenge;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, setAuthMode } = authSlice.actions;
export default authSlice.reducer; 