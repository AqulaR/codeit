import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/css/header.css'
import { IoIosArrowForward } from "react-icons/io";
import logo from '../assets/imgs/logo.png'

const Header = () => {
  const [username, setUsername] = useState(''); 
  const [WSData, setWSData] = useState([]);

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const workspaceId = searchParams.get('id');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const usernameLocal = localStorage.getItem('Username');
    if (usernameLocal) {
      setUsername(usernameLocal);
    } else {
      setUsername('');
    }
  });


  // console.log(location.pathname);

  useEffect(() => {

    if (workspaceId && token) {
      // console.log('Workspace ID:', workspaceId);
      // console.log('token:', token);

      const fetchDataWSName = async () => {
        try {
          const responseWSdata = await fetch(`${serverUrl}/api/workspaces/${workspaceId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          const WSdata = await responseWSdata.json();
          setWSData(WSdata.data);
        } catch (error) {
          console.log('Ошибка в обращении: ', error);
        }
      }

      fetchDataWSName();
    }
  }, []);

  return (
    <div className="header_outer">
      {location.pathname == '/dash' ? (
        <nav className='header_nav_dark d-flex justify-content-between align-items-center'>
          <div className='d-flex flex-row align-items-center gap-4 mb-1 mt-1 ps-3'>
            {/* <span><Link to="/" className='header_links_light'>Главная</Link></span> */}
            <img src={logo} alt="" className="header_logo" />
            <span><Link to="/dash" className='header_links_light header_link_active_light'>Панель</Link></span>
            <span><Link to="/compiler" className='header_links_light'>Компилятор</Link></span>
          </div>
          <span className='d-flex gap-2 pe-5'>
            {username ? (
              <span className='header_links_light'>{username}</span>
            ) : (
              <span>не авторизирован</span>
            )}
          </span>
        </nav>
      ) : (
        location.pathname == '/workspace' ? (
          <nav className='header_nav_dark flex-row-reverse d-flex justify-content-between px-3 align-items-center'>
            <div className='d-flex gap-4 mb-1 mt-1'>
              <img src={logo} alt="" className="header_logo_dark" />
              {/* <span><Link to="/" className='header_links'>Главная</Link></span>
              <span><Link to="/dash" className='header_links'>Панель</Link></span>
              <span><Link to="/compiler" className='header_links'>Компилятор</Link></span> */}
              {/* <span><Link to="/workspace" className='header_links'>Рабочее простанство</Link></span> */}
              {/* <span><Link to="/register" className='header_links'>Регистрация</Link></span>
        <span><Link to="/login" className='header_links'>Вход</Link></span> */}
            </div>
            {workspaceId ? (
              <div className="d-flex flex-row gap-1 align-items-center">
                <span className='header_links_light'>{username}</span> <IoIosArrowForward className='header_links_light' /> <Link to="/dash" className='header_links_light'>Панель</Link> <IoIosArrowForward className='header_links_light' /><span className='header_links_light'>{WSData.name}</span>
              </div>
            ) : (
              <span>не авторизирован</span>
            )}
            {/* <button onClick={() => {localStorage.clear(); setUsername(null); console.log(localStorage);}} >Logout</button>
        <button onClick={() => {console.log(localStorage);}} >Get</button> */}
          </nav>
        ) : (
          location.pathname == '/compiler' && username ? (
            <nav className='header_nav_dark d-flex justify-content-between align-items-center'>
              <div className='d-flex flex-row align-items-center gap-4 mb-1 mt-1 ps-3'>
                <img src={logo} alt="" className="header_logo_dark" />
                <span><Link to="/dash" className='header_links_light'>Панель</Link></span>
                <span><Link to="/compiler" className='header_links_light header_link_active_light'>Компилятор</Link></span>
              </div>
              <span className='d-flex gap-2'>
                {username ? (
                  <span className='header_links_light pe-4'>{username}</span>
                ) : (
                  <span className='header_links_light'>не авторизирован</span>
                )}
              </span>
            </nav>
          ) : (
            location.pathname == '/compiler' && !username ? (
              <nav className='header_nav d-flex justify-content-between align-items-center'>
                <div className='d-flex flex-row align-items-center gap-4 mb-1 mt-1 ps-3'>
                  {/* <img src={logo} alt="" className="header_logo_dark" /> */}
                  <span><Link to="/" className='header_links'>Главная</Link></span>
                  <span><Link to="/compiler" className='header_links header_link_active'>Компилятор</Link></span>
                </div>
                <span className='d-flex gap-2 pe-4'>
                  <span><Link to="/register" className='header_links'>Регистрация</Link></span>
                  <span><Link to="/login" className='header_links'>Вход</Link></span>
                </span>
              </nav>
            ) : (
              ''
            )
          )
        )
      )}
    </div>
  );
};

export default Header;