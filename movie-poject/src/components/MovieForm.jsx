
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie } from '../redux/movieSlice';
import axios from 'axios';

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [poster, setPoster] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovie = {
      title: title || "Default Title",
      year: year || "2023",
      poster: poster || "https://example.com/default-poster.jpg",
    };

    setLoading(true);
    setError(null);

    try {
      const { data: movies } = await axios.get('http://localhost:3000/movies');

      const newId = movies.length > 0 ? Math.max(...movies.map(movie => parseInt(movie.id))) + 1 : 1;

      const movieWithId = { ...newMovie, id: newId, userId };

      const { data } = await axios.post('http://localhost:3000/movies', movieWithId);

      dispatch(addMovie(data)); 
      
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
      {error && <p style={{ color: 'red' }}>{error}</p>} 
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
