import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getClientSidePKCE } from '@/utils/pkce';

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    username: string;
    role: string;
  } | null;
  loading: boolean;
  error: string | null;
  codeVerifier: string | null;
  codeChallenge: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  codeVerifier: null,
  codeChallenge: null,
};

// Async thunk for generating PKCE code verifier and challenge
export const initializePKCE = createAsyncThunk(
  'auth/initializePKCE',
  async () => {
    if (typeof window === 'undefined') {
      return { verifier: null, challenge: null };
    }
    
    try {
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

// Async thunk for simulating authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: { username: string; password: string }, { getState, rejectWithValue }) => {
    try {
      // In a real app, you would make an API call here
      // For simulation, we'll check for a simple credential
      
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (username === 'admin' && password === 'password') {
        return { username, role: 'admin' };
      } else if (username === 'user' && password === 'password') {
        return { username, role: 'user' };
      } else {
        return rejectWithValue('Invalid credentials');
      }
    } catch (error) {
      return rejectWithValue('Authentication failed');
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
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer; 