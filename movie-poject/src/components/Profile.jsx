import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { logout } from '../redux/authSlice';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    dispatch(logout());
    navigate('/login'); 
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ color: '#333' }}>Profile</h1>
      {user ? (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '300px', margin: '0 auto', backgroundColor: '#f9f9f9' }}>
          <p style={{ fontSize: '18px', color: '#555' }}>
            Name: <strong>{user.firstName} {user.lastName}</strong>
          </p>
          <p style={{ fontSize: '18px', color: '#555' }}>
            Email: <strong>{user.email}</strong>
          </p>
          <button 
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <p style={{ color: '#777', fontSize: '18px' }}>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
