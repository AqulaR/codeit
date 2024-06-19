import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '../assets/css/lrstyles.css'
import logo from '../assets/imgs/logo.png'
import React from "react"
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('Username');
    if (username) {
      setUsername(username);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseLogin = await fetch(`${serverUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const dataToken = await responseLogin.json();
      // console.log(dataToken);
      if (dataToken.success) {
        const token = dataToken.token;
  
        const responseMe = await fetch(`${serverUrl}/api/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
  
        const dataUser = await responseMe.json();
  
        localStorage.setItem('authToken', token);
        localStorage.setItem('Username', dataUser.data.username);
        localStorage.setItem('email', dataUser.data.email);
        setUsername(dataUser.data.username);
        navigate('/dash');
      } else {
        console.log(dataToken.error);
        setError(dataToken.error);
      }

      // console.log(localStorage);

      // handleLoginSuccess();
      // window.location.href = '/dash';
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="d-flex flex-row w-100">
      <div className="lr-outer d-flex flex-column align-items-center justify-content-center gap-5">
        {username ? (
          <div className="lr-con d-flex flex-column gap-5 justify-content-center align-items-center">
            <div className="d-flex justify-content-between">
              <h1>Вы хотите выйти?</h1>
            </div>
            {/* <span>Вход выполнен под аккаунтом: {username}</span> */}
            <div className='d-flex gap-2 flex-wrap'>
              <button className='lr-subm-colorized non_a' onClick={() => { localStorage.clear(); setUsername(null); console.log(localStorage);}} >Выйти</button>
              <Link to={"/dash"} className='lr-subm non_a'>Продолжить</Link>
            </div>
            <div className="lr-info mt-5 justify-content-center">
              <Link to="/" className="">
                <img src={logo} alt="" className="lr-header-logo" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="lr-con d-flex flex-column gap-4">
            <div className="d-flex justify-content-between">
              <h1>Вход</h1>
            </div>
            <form className=" d-flex flex-column gap-4" onSubmit={handleSubmit}>
              <div className="d-flex flex-column gap-3">
                <input type="email" className="lr-inpts" placeholder="Ваш email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" className="lr-inpts" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {error ? (
                  <span className='errorsLR'>{error}</span>
                ):(
                  ''
                )}
              </div>
              <input type="submit" value="Войти" className="lr-subm" />
            </form>
            <div className="d-flex gap-1 flex-column">
              <span>Нет аккаунта?</span>
              <Link to="/register">Регистрация</Link>
            </div>
            <div className="lr-info mt-5">
              <Link to="/" className="">
                <img src={logo} alt="" className="lr-header-logo" />
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="lr-bg align-self-stretch position-relative">
        <Link to="/" className="lr-logo position-absolute">
          <img src={logo} alt="" />
        </Link>
      </div>
    </div>
  )
}

export default Login
