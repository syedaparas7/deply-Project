import React, { useState } from 'react';
import axios from 'axios';
import "../index.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
      if (response.data.success){
        login(response.data.user)
        localStorage.setItem("token", response.data.token)
        if (response.data.user.role === "admin") {
          navigate('/admin-dashboard')
        } else {
          navigate('/employee-dashboard')
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success){
        setError(error.response.data.error)
      } else {
        setError("Server Error")
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>TaskFlow</h2>
        <h3>Smart Project Management</h3>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        {error && <p className="error-message">{error}</p>} 
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
