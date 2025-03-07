import React from 'react'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css';

const Navbar = () => {
  const {user, logout} = useAuth()
  return (
    <div className="navbar">
      <p>Welcome {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar