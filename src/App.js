import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Waiting from './pages/Waiting/Waiting';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/waiting" element={<Waiting/>} />
      {/* Add a default route (optional) */}
    </Routes>
  </BrowserRouter>
  )
}

export default App
