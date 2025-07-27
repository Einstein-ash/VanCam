import React from 'react';
import  "./login.css"
const LoginButton = () => {

  const Base_URL = 'https://van-cam-back.vercel.app'
  //  const Base_URL = 'http://localhost:5000'

  const handleLogin = () => {
    window.location.href = `${Base_URL}/auth/google`;
  };

  return (
    <div className='main_login_container'>
      <button onClick={handleLogin}>
        Log in with Google
      </button>
    </div>
  );
};

export default LoginButton;
