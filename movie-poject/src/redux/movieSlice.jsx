

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/movies';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addMovie = createAsyncThunk('movies/addMovie', async (newMovie, thunkAPI) => {
  const state = thunkAPI.getState();
  const userId = state.auth.user?.id;
  const response = await axios.post(API_URL, {
    ...newMovie,
    userId,
  });
  return response.data;
});

export const editMovie = createAsyncThunk('movies/editMovie', async (updatedMovie, thunkAPI) => {
  const state = thunkAPI.getState();
  const userId = state.auth.user?.id;
  const response = await axios.put(`${API_URL}/${updatedMovie.id}`, {
    ...updatedMovie,
    userId,
  });
  return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        const index = state.list.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.list = state.list.filter(movie => movie.id !== action.payload);
      });
  },
});

export const { setMovies } = movieSlice.actions;

export default movieSlice.reducer;
