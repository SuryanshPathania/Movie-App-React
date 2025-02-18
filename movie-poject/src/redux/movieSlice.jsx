// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const API_URL = 'http://localhost:3000/movies';

// // Async thunk to fetch movies from the API
// export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
//   const response = await fetch(API_URL);
//   if (!response.ok) {
//     throw new Error('Failed to fetch movies');
//   }

//   const data = await response.json();
//   return data; // Assuming the API returns an array of movies
// });

// // Async thunk to add a movie
// export const addMovie = createAsyncThunk('movies/addMovie', async (newMovie) => {
//   const response = await fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newMovie),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to add movie');
//   }
//   const data = await response.json();
//   return data; // Return the newly created movie
// });

// // Async thunk to edit a movie
// export const editMovie = createAsyncThunk('movies/editMovie', async (updatedMovie) => {
//   const response = await fetch(`${API_URL}/${updatedMovie.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updatedMovie),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to update movie');
//   }
//   const data = await response.json();
//   return data; // Return the updated movie
// });

// // Async thunk to delete a movie
// export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'DELETE',
//   });
//   if (!response.ok) {
//     throw new Error('Failed to delete movie');
//   }
//   return id; // Return the ID of the deleted movie
// });

// const movieSlice = createSlice({
//   name: 'movies',
//   initialState: {
//     list: [],
//     status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null,
//   },
//   reducers: {
//     setMovies: (state, action) => {
//       state.list = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMovies.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchMovies.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.list = action.payload; // Add the fetched movies to the state
//       })
//       .addCase(fetchMovies.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addMovie.fulfilled, (state, action) => {
//         state.list.push(action.payload); // Add the new movie to the state
//       })
//       .addCase(editMovie.fulfilled, (state, action) => {
//         const index = state.list.findIndex(movie => movie.id === action.payload.id);
//         if (index !== -1) {
//           state.list[index] = action.payload; // Update the movie in the state
//         }
//       })
//       .addCase(deleteMovie.fulfilled, (state, action) => {
//         state.list = state.list.filter(movie => movie.id !== action.payload); // Remove the deleted movie from the state
//       });
//   },
// });

// // Export actions
// export const { setMovies } = movieSlice.actions;

// // Default export of the reducer
// export default movieSlice.reducer;




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000/movies';

// Async thunk to fetch movies from the API
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  return data; // Assuming the API returns an array of movies
});

// Async thunk to add a movie
export const addMovie = createAsyncThunk('movies/addMovie', async (newMovie) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMovie),
  });
  if (!response.ok) {
    throw new Error('Failed to add movie');
  }
  const data = await response.json();
  return data; // Return the newly created movie
});

// Async thunk to edit a movie
export const editMovie = createAsyncThunk('movies/editMovie', async (updatedMovie) => {
  const response = await fetch(`${API_URL}/${updatedMovie.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedMovie),
  });
  if (!response.ok) {
    throw new Error('Failed to update movie');
  }
  const data = await response.json();
  return data; // Return the updated movie
});

// Async thunk to delete a movie
export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete movie');
  }
  return id; // Return the ID of the deleted movie
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
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
        state.list = action.payload; // Add the fetched movies to the state
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.list.push(action.payload); // Add the new movie to the state
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        const index = state.list.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload; // Update the movie in the state
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.list = state.list.filter(movie => movie.id !== action.payload); // Remove the deleted movie from the state
      });
  },
});

// Export actions
export const { setMovies } = movieSlice.actions;

// Default export of the reducer
export default movieSlice.reducer;