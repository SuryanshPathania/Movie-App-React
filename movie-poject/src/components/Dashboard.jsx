// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMovies, addMovie, editMovie, deleteMovie } from '../redux/movieSlice';

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const movies = useSelector((state) => state.movies.list);
//   const [movie, setMovie] = useState({ id: '', userId: 1, title: '', year: '', poster: '' });
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false); // Loading state
//   const error = useSelector((state) => state.movies.error); // Error handling

//   // Fetch movies when the component mounts
//   useEffect(() => {
//     setLoading(true);
//     dispatch(fetchMovies()).finally(() => setLoading(false)); // Set loading state
//   }, [dispatch]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMovie({ ...movie, [name]: value });
//   };

//   // Handle form submission for adding or editing a movie
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       dispatch(editMovie(movie)); // Dispatch the editMovie action
//     } else {
//       // Calculate the new ID based on existing movies
//       const newId = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1; // Increment ID
//       const newMovie = { ...movie, id: newId }; // Create new movie object
//       dispatch(addMovie(newMovie)); // Dispatch the addMovie action
//     }
//     // Reset form
//     setMovie({ id: '', userId: 1, title: '', year: '', poster: '' });
//     setIsEditing(false);
//   };

//   // Handle editing a movie
//   const handleEdit = (movie) => {
//     setMovie(movie);
//     setIsEditing(true);
//   };

//   // Handle deleting a movie
//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this movie?')) {
//       dispatch(deleteMovie(id)); // Dispatch the deleteMovie action
//     }
//   };

//   return (
//     <div>
//       {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
//       <h1>Movie Dashboard</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           value={movie.title}
//           onChange={handleChange}
//           placeholder="Movie Title"
//           required
//         />
//         <input
//           type="text"
//           name="year"
//           value={movie.year}
//           onChange={handleChange}
//           placeholder="Release Year"
//           required
//         />
//         <input
//           type="text"
//           name="poster"
//           value={movie.poster}
//           onChange={handleChange}
//           placeholder="Poster URL"
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {isEditing ? 'Update Movie' : 'Add Movie'}
//         </button>
//       </form>
//       {loading ? (
//         <p>Loading movies...</p>
//       ) : (
//         <>
//           <h2>Movie List</h2>
//           <ul>
//             {movies.map((movie) => (
//               <li key={movie.id}>
//                 <h3>{movie.title} ({movie.year})</h3>
//                 <img src={movie.poster} alt={movie.title} style={{ width: '100px' }} />
//                 <button onClick={() => handleEdit(movie)}>Edit</button>
//                 <button onClick={() => handleDelete(movie.id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMovies, addMovie, editMovie, deleteMovie } from '../redux/movieSlice';
// import '../../src/App.css'
// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const movies = useSelector((state) => state.movies.list);
//   const loading = useSelector((state) => state.movies.loading);
//   const error = useSelector((state) => state.movies.error);
//   const [movie, setMovie] = useState({ id: '', userId: 1, title: '', year: '', poster: '' });
//   const [isEditing, setIsEditing] = useState(false);

//   // Fetch movies when the component mounts
//   useEffect(() => {
//     dispatch(fetchMovies());
//   }, [dispatch]);

//   // Handle input changes
//   const handleChange = (e) => {
//     setMovie({ ...movie, [e.target.name]: e.target.value });
//   };

//   // Handle form submission for adding or editing a movie
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       dispatch(editMovie(movie));
//     } else {
//       const newId = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
//       dispatch(addMovie({ ...movie, id: newId }));
//     }
//     setMovie({ id: '', userId: 1, title: '', year: '', poster: '' }); // Reset form
//     setIsEditing(false);
//   };

//   // Handle editing a movie
//   const handleEdit = (movie) => {
//     setMovie(movie);
//     setIsEditing(true);
//   };

//   // Handle deleting a movie
//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this movie?')) {
//       dispatch(deleteMovie(id));
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h1>Movie Dashboard</h1>

//       {/* Display error message */}
//       {error && <p className="error-message">{error}</p>}

//       {/* Movie Form */}
//       <form onSubmit={handleSubmit} className="movie-form">
//         <input type="text" name="title" value={movie.title} onChange={handleChange} placeholder="Movie Title" required />
//         <input type="text" name="year" value={movie.year} onChange={handleChange} placeholder="Release Year" required />
//         <input type="text" name="poster" value={movie.poster} onChange={handleChange} placeholder="Poster URL" required />
//         <button type="submit" disabled={loading}>
//           {isEditing ? 'Update Movie' : 'Add Movie'}
//         </button>
//       </form>

//       {/* Loading Indicator */}
//       {loading && <p className="loading-message">Loading movies...</p>}

//       {/* Movie List */}
//       {!loading && movies.length > 0 ? (
//         <div className="movie-list">
//           {movies.map((movie) => (
//             <div key={movie.id} className="movie-card">
//               <img src={movie.poster} alt={movie.title} className="movie-poster" />
//               <h3>{movie.title} ({movie.year})</h3>
//               <div className="movie-actions">
//                 <button className="edit-btn" onClick={() => handleEdit(movie)}>Edit</button>
//                 <button className="delete-btn" onClick={() => handleDelete(movie.id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="no-movies-message">No movies available.</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Add this import
import { fetchMovies, addMovie, editMovie, deleteMovie } from '../redux/movieSlice';
import '../../src/App.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const loading = useSelector((state) => state.movies.loading);
  // const error = useSelector((state) => state.movies.error);
  const [movie, setMovie] = useState({ id: '',  title: '', year: '', poster: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch movies when the component mounts
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  // Handle form submission for adding or editing a movie
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(editMovie(movie));
    } else {
      const newId = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
      dispatch(addMovie({ ...movie, id: newId }));
    }
    setMovie({ id: '',  title: '', year: '', poster: '' });
    setIsEditing(false);
  };

  // Handle editing a movie
  const handleEdit = (movie) => {
    setMovie(movie);
    setIsEditing(true);
  };

  // Handle deleting a movie
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      dispatch(deleteMovie(id));
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Movie Dashboard</h1>
        <Link to="/profile" className="profile-button">
          My Profile
        </Link>
      </div>

      {/* Display error message */}
      {/* {error && <p className="error-message">{error}</p>} */}

      {/* Movie Form */}
      <form onSubmit={handleSubmit} className="movie-form">
        <input type="text" name="title" value={movie.title} onChange={handleChange} placeholder="Movie Title" required />
        <input type="number" name="year" value={movie.year} onChange={handleChange} placeholder="Release Year" required min="1880" max="2099" />
        <input type="url" name="poster" value={movie.poster} onChange={handleChange} placeholder="Poster URL" required />
        <button type="submit" disabled={loading} className="submit-btn">
          {isEditing ? 'Update Movie' : 'Add Movie'}
        </button>
      </form>

      {/* Loading Indicator */}
      {loading && <p className="loading-message">Loading movies...</p>}

      {/* Movie List */}
      {!loading && movies.length > 0 ? (
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.poster} alt={movie.title} className="movie-poster" />
              <h3>{movie.title} ({movie.year})</h3>
              <div className="movie-actions">
                <button className="edit-btn" onClick={() => handleEdit(movie)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(movie.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-movies-message">No movies available.</p>
      )}
    </div>
  );
};

export default Dashboard;



