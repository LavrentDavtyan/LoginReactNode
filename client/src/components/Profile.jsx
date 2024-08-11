import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found, please log in.');
      navigate('/login');
      return;
    }

    fetch('http://localhost:3000/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        return response.json();
      })
      .then(data => setProfileData(data))
      .catch(err => setError(err.message));
  }, [navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className='profile'>
      <h1>Profile</h1>
      <p>Email: {profileData.email}</p>
    </div>
  );
};

export default Profile;
