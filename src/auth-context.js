import { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [error, setError] = useState('');
  
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );


  const login = (username, password) => {
    axios.post('http://localhost:8000/accounts/login/', {
      username,
      password,
    })
      .then((response) => {
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUsername(username);
          localStorage.setItem('email',response.data.email)
          localStorage.setItem('id', response.data.id)
          localStorage.setItem('token',response.data.token )
          
        } else {
          setError('Login failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred');
      });
  };

  const logout = () => {
    axios.get('http://localhost:8000/accounts/logout/')
      .then((response) => {
        if (response.status === 200) {
          setIsAuthenticated(false);
          setUsername('');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      localStorage.removeItem('username');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('email');
      setIsAuthenticated(false);
      setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider,  };