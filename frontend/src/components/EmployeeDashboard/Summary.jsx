import React from 'react'
import {FaUser} from 'react-icons/fa'
import {useAuth} from '../../context/AuthContext'
import './Summary.css'

const Summary = () => {
  const {user} = useAuth()
  const bgColor="#17a2b8";
  return (
    <div className="summary-cards-container1">
    <div className="summary-card1" style={{ borderLeft: `5px solid ${bgColor}` }}>
      <div className="summary-card-icon1" style={{ color: bgColor }}>
        <FaUser/>
      </div>
      <div className="summary-card-info1">
        <span className="summary-card-text1">Welcome Back</span>
        <span className="summary-card-number1">{user.name}</span>
      </div>
    </div>
    </div>
  )
}

export default Summary


