import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  "./login.css"
const LoginButton = () => {
  const navigate = useNavigate();

  const Base_URL = 'https://van-cam-back.vercel.app'
  //  const Base_URL = 'http://localhost:5000'

  const handleLogin = () => {
    window.location.href = `${Base_URL}/auth/google`;
  };

  useEffect(()=>{

    const data = localStorage.getItem('userData');
    if(data){
      navigate("/profile");
    }
  })


  return (
    <div className='main_login_container'>

      <button class="button" onClick={handleLogin}>
          <div class="wrap">
            <p>
              <span>✧</span>
              <span>✦</span>
              Log in with Google
            </p>
          </div>
</button>


      {/* <button onClick={handleLogin}>
        Log in with Google
      </button> */}
    </div>
  );
};

export default LoginButton;
