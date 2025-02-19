
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data: existingUsers } = await axios.get(
        `http://localhost:3000/users?email=${email}`
      );

      if (existingUsers.length > 0) {
        throw new Error('Email already registered!');
      }
    
    const { data: allUsers } = await axios.get('http://localhost:3000/users');
    const newId = allUsers.length > 0 
      ? Math.max(...allUsers.map(user => parseInt(user.id))) + 1 
      : 1;
      const { data: newUser } = await axios.post('http://localhost:3000/users', {
        id: newId,
        firstName,
        lastName,
        email,
        password
      });

      dispatch(login(newUser));
      navigate('/');

    } catch (error) {
      console.error('Signup error:', error);
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      
      {error && <div className="error-message">{error}</div>}
      
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
