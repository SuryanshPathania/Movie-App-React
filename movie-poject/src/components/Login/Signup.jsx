
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const newUser = { firstName, lastName, email, password };

    try {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

      if (existingUsers.some(user => user.email === email)) {
        alert('Email already registered!');
        return;
      }

      const { data: users } = await axios.get('http://localhost:3000/users');

      const newId = users.length > 0 ? Math.max(...users.map(user => parseInt(user.id))) + 1 : 1;

      const userWithId = { ...newUser, id: newId };

      const { data } = await axios.post('http://localhost:3000/users', userWithId);

      const updatedUsers = [...existingUsers, userWithId];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      dispatch(login(data));
      localStorage.setItem('currentUser', JSON.stringify(data));
      navigate('/login');

    } catch (error) {
      console.error('Error creating user:', error);
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
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
