import React, { useEffect, createContext, useState, useContext } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const userContext = createContext();

const AuthContext = ({children}) => {  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect (() => { 
  const verifyUser = async() => { 
    try { 
      const token = localStorage.getItem('token')
      if(token){ 
      const response = await axios.get(`${API_URL}/api/auth/verify`,{
        
        headers: {
          "Authorization" : `Bearer ${token}`
        },
      });
      console.log(" API_URL IS :",API_URL);//checked console
       console.log(response)
      if(response.data.success){
        setUser(response.data.user)
       }
      } else {
        setUser(null)
        setLoading(false)
      }
    } catch(error) { 
      console.log(error)
      if(error.response && !error.response.data.error){
      setUser(null)
      }
    } finally {
      setLoading(false)
    }
  }
  verifyUser()
}, []) 

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);  
export default AuthContext;