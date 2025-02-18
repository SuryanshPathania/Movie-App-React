// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addMovie } from '../redux/movieSlice';

// const MovieForm = () => {
//   const [title, setTitle] = useState('');
//   const [year, setYear] = useState('');
//   const [poster, setPoster] = useState('');
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.auth.user?.id); // Get the current user's ID from auth state

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Set default values if fields are empty
//     const newMovie = {
//       title: title || "Default Title", // Set a default title if empty
//       year: year || "2023", // Set a default year if empty
//       poster: poster || "https://example.com/default-poster.jpg", // Set a default poster URL if empty
//     };

//     setLoading(true); // Set loading to true
//     setError(null); // Reset error state

//     try {
//       // Fetch existing movies to determine the highest id
//       const moviesResponse = await fetch('http://localhost:3000/movies');
//       if (!moviesResponse.ok) {
//         throw new Error('Failed to fetch movies');
        
//       }
      
//       const movies = await moviesResponse.json();

//       // Calculate the new id
//       const newId = movies.length > 0 ? Math.max(...movies.map(movie => parseInt(movie.id))) + 1 : 1;

//       // Create the new movie object with the new id and userId
//       const movieWithId = { ...newMovie, id: newId, userId: userId };

//       // Send a POST request to the API to add a new movie
//       const response = await fetch('http://localhost:3000/movies', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(movieWithId),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       dispatch(addMovie(data)); // Dispatch the action to add the new movie to the Redux state

//       // Clear form fields
//       setTitle('');
//       setYear('');
//       setPoster('');
//     } catch (error) {
//       console.error('Error adding movie:', error);
//       setError('Failed to add movie. Please try again.'); // Set error message
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Movie Title"
//         required
//       />
//       <input
//         type="text"
//         value={year}
//         onChange={(e) => setYear(e.target.value)}
//         placeholder="Release Year"
//         required
//       />
//       <input
//         type="text"
//         value={poster}
//         onChange={(e) => setPoster(e.target.value)}
//         placeholder="Poster URL"
//         required
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? 'Adding...' : 'Add Movie'}
//       </button>
//     </form>
//   );
// };

// export default MovieForm;


import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie } from '../redux/movieSlice';
import axios from 'axios';

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [poster, setPoster] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id); // Get the current user's ID from auth state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set default values if fields are empty
    const newMovie = {
      title: title || "Default Title",
      year: year || "2023",
      poster: poster || "https://example.com/default-poster.jpg",
    };

    setLoading(true);
    setError(null);

    try {
      // Fetch existing movies to determine the highest id
      const { data: movies } = await axios.get('http://localhost:3000/movies');

      // Calculate the new id
      const newId = movies.length > 0 ? Math.max(...movies.map(movie => parseInt(movie.id))) + 1 : 1;

      // Create the new movie object with the new id and userId
      const movieWithId = { ...newMovie, id: newId, userId };

      // Send a POST request to add a new movie
      const { data } = await axios.post('http://localhost:3000/movies', movieWithId);

      dispatch(addMovie(data)); // Dispatch the action to update Redux state

      // Clear form fields
      setTitle('');
      setYear('');
      setPoster('');
    } catch (error) {
      console.error('Error adding movie:', error);
      setError('Failed to add movie. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Movie Title"
        required
      />
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Release Year"
        required
      />
      <input
        type="text"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
        placeholder="Poster URL"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Movie'}
      </button>
    </form>
  );
};

export default MovieForm;
