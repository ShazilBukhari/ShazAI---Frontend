import React from 'react'
import { Routes,Route } from 'react-router-dom' 
import Home from './Components/Home'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Chat from './Components/Chat'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  )
}

export default App