import { useState } from 'react'
// import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dash from './pages/Dash';
import Compiler from './pages/Compiler';
import Header from './components/Header';
import Login from './pages/login';
import Register from './pages/registration';
import Workspace from './pages/Workspace';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/not_found';

// console.log(import.meta.env.VITE_SERVER_URL);

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dash" element={<ProtectedRoute><Dash /></ProtectedRoute>} />
          <Route path="/workspace" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
