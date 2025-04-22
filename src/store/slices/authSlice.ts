
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  displayName: string;
  uid: string; // Added uid field
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    signIn: (state, action: PayloadAction<{ email: string; password: string }>) => {
      // Simulate authentication
      state.user = {
        id: '1',
        uid: '1', // Added uid
        email: action.payload.email,
        displayName: 'Demo User'
      };
    },
    signUp: (state, action: PayloadAction<{ email: string; password: string; displayName: string }>) => {
      // Simulate registration
      state.user = {
        id: '1',
        uid: '1',
        email: action.payload.email,
        displayName: action.payload.displayName
      };
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, signIn, signUp, signOut } = authSlice.actions;
export default authSlice.reducer;
