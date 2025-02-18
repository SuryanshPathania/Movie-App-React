
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    const matchedUser = storedUsers.find(user => 
      user.email === email && user.password === password
    );

    if (matchedUser) {
      dispatch(login(matchedUser));
      // Store logged-in user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
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