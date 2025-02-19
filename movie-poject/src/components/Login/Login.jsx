
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const state = useSelector()

  const handleLogin = async(e) => {
    e.preventDefault();
    
    // const storedUsers = state.auth.user|| [];
    const response =await axios.get('http://localhost:3000/users');
    const storedUsers = response.data
    const matchedUser = storedUsers.find(user => 
      user.email === email && user.password === password
    );

    if (matchedUser) {
      dispatch(login(matchedUser));
      // localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      navigate('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        <button type="button" onClick={handleSignup}>Signup</button>
      </form>
    </div>
  );
};

export default Login;