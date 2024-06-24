// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import React from "react"
import { Link } from "react-router-dom"
import '../assets/css/not_found.css'
import logo from '../assets/imgs/logo.png'


function NotFound() {
  return (
    <div className="not_found_outer w-100 h-100 d-flex flex-column justify-content-center align-items-center gap-3">
      <img src={ logo } />
      <h1 className="not_found_code">404!</h1>
      <p>Упс! Запрашиваемая страница не найдена</p>
      <Link to="/" className='not_found_button'>На главную</Link>
    </div>
  )
}

export default NotFound
