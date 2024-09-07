import React from 'react';

const LoginButton = () => {

  const Base_URL = 'http://localhost:5000'

  const handleLogin = () => {
    window.location.href = `${Base_URL}/auth/google`;
  };

  return (
    <button onClick={handleLogin}>
      Log in with Google
    </button>
  );
};

export default LoginButton;
