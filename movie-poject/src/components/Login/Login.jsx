// import  { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../../redux/authSlice'; // Ensure this path is correct
// import { useNavigate } from 'react-router-dom';
// import './Login.css'

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Use useNavigate instead of useHistory

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const user = { email, password }; // Ensure this is serializable
//     dispatch(login(user)); // Dispatching the login action
//     navigate('/dashboard'); // Redirect to dashboard after login
//   };


//   const handleSignup=(e)=>{
//     e.preventDefault();
//     navigate('/signup')
//   }
//   return (
//     <div className="login-container">
//     <form onSubmit={handleLogin}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Login</button>
//       <button onClick={handleSignup}>Signup</button>
//     </form>
//    </div>
//   );
// };

// export default Login;
// Login.jsx
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
    
    // Get users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find matching user
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