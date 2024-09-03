import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <button onClick={handleLogin}>
      Log in with Google
    </button>
  );
};

export default LoginButton;
