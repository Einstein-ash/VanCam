import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract user data from URL query parameters
    const query = new URLSearchParams(location.search);
    const userData = query.get('user');

    if (userData) {
      // Store data in localStorage
      localStorage.setItem('userData', userData);

      // Navigate to the UserProfile component
      navigate('/profile');
    }
  }, [location, navigate]);

  return null; // No need to render anything here
};

export default AuthCallback;
