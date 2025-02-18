// import { call, put, takeEvery } from 'redux-saga/effects';
// import { setMovies, addMovie, editMovie, deleteMovie } from './movieSlice';

// // Fetch movies from the API
// function* fetchMovies() {
//   try {
//     const response = yield call(fetch, 'http://localhost:3000/movies');
//     if (!response.ok) {
//       throw new Error('Failed to fetch movies');
//     }
    
//     const data = yield response.json();
//     yield put(setMovies(data)); // Dispatch the action to set movies in the state
//   } catch (error) {
//     console.error(error);
//     // Handle error (you might want to dispatch an error action here)
//   }
// }

// // Add a new movie to the API
// function* addMovieSaga(action) {
//   try {
//     const response = yield call(fetch, 'http://localhost:3000/movies', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(action.payload),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to add movie');
//     }
//     const data = yield response.json();
//     yield put(addMovie.fulfilled(data)); // Dispatch the action to add the movie to the state
//   } catch (error) {
//     console.error(error);
//     // Handle error (you might want to dispatch an error action here)
//   }
// }

// // Edit an existing movie in the API
// function* editMovieSaga(action) {
//   try {
//     const response = yield call(fetch, `http://localhost:3000/movies/${action.payload.id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(action.payload),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to update movie');
//     }
//     const data = yield response.json();
//     yield put(editMovie.fulfilled(data)); // Dispatch the action to update the movie in the state
//   } catch (error) {
//     console.error(error);
//     // Handle error (you might want to dispatch an error action here)
//   }
// }

// // Delete a movie from the API
// function* deleteMovieSaga(action) {
//   try {
//     const response = yield call(fetch, `http://localhost:3000/movies/${action.payload}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) {
//       throw new Error('Failed to delete movie');
//     }
//     yield put(deleteMovie.fulfilled(action.payload)); // Dispatch the action to remove the movie from the state
//   } catch (error) {
//     console.error(error);
//     // Handle error (you might want to dispatch an error action here)
//   }
// }

// // Watcher saga to listen for actions
// export function* watchMovieActions() {
//   yield takeEvery('movies/fetchMovies', fetchMovies);
//   yield takeEvery('movies/addMovie', addMovieSaga);
//   yield takeEvery('movies/editMovie', editMovieSaga);
//   yield takeEvery('movies/deleteMovie', deleteMovieSaga);
// }