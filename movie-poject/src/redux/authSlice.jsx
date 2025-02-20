import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getInitialUser  = () => {
  try {
    return JSON.parse(localStorage.getItem('user')) || null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('user');
    return null;
  }
};

const initialState = {
  user: getInitialUser (),
  status: 'idle',
  error: null,
};

export const signupUser  = createAsyncThunk(
  'auth/signupUser ',
  async (userData, { rejectWithValue }) => {
    try {
      
      const { data: existingUsers } = await axios.get(
        `http://localhost:3000/users?email=${userData.email}`
      );

      if (existingUsers.length > 0) {
        return rejectWithValue('Email already registered');
      }

      
      const { data: allUsers } = await axios.get('http://localhost:3000/users');
      const newId = allUsers.length > 0 
        ? Math.max(...allUsers.map(user => parseInt(user.id))) + 1 
        : 1;

      
      const { data: newUser  } = await axios.post('http://localhost:3000/users', {
        ...userData,
        id: newId
      });

      return newUser ;

    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser .pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser .fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(signupUser .rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Signup failed';
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;