import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, 
  status: 'idle', 
  error: null,
};

export const signupUser  = createAsyncThunk('auth/signupUser ', async (userData) => {
  const usersResponse = await fetch('http://localhost:3000/users');
  if (!usersResponse.ok) {
    throw new Error('Failed to fetch users');
  }
  
  const users = await usersResponse.json();

  const newId = users.length > 0 ? Math.max(...users.map(user => parseInt(user.id))) + 1 : 1;

  const newUser  = { ...userData, id: newId };

  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser ),
  });

  if (!response.ok) {
    throw new Error('Failed to sign up user');
  }

  const data = await response.json();
  return data; 
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); 
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user'); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser .pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser .fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; 
        localStorage.setItem('user', JSON.stringify(action.payload)); 
      })
      .addCase(signupUser .rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; 
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;