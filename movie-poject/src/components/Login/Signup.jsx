
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser  } from '../../redux/authSlice';
import './Signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setFormError('All fields are required.');
      return;
    } else {
      setFormError(''); 
    }

    const userData = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      password
    };

    const result = await dispatch(signupUser (userData)); 

    if (signupUser .fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>

        {formError && <div className="error-message">{formError}</div>}
        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;