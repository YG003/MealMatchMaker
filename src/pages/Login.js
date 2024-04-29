import axios from 'axios';
import React, { useState } from 'react';
import {
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from '../auth-context'; // Import the AuthContext
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';

const Login = () => {
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = React.useContext(AuthContext); // Add isAuthenticated to the destructured variables

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = 'http://localhost:8000/accounts/login/';
    const data = { username, password };
  
    axios.post(url, data)
      .then((response) => {
        if (response.status === 200) {
          login(username, password);
  
          // After successful login, fetch recipes for the logged-in user
          axios.get('http://localhost:8000/accounts/recipes/', {
            headers: {
              // Assuming the server returns a token upon login
            }
          })
          .then(() => {
            // Assuming recipesResponse.data contains the recipes data
            // You can set this data to state or navigate to a page displaying the recipes
            navigate('/profile');
          })
          .catch((recipesError) => {
            console.error('Error fetching recipes:', recipesError);
            setError('An error occurred while fetching recipes');
          });
  
          navigate('/profile');
          localStorage.setItem('username', username);
          localStorage.setItem('isAuthenticated', true);
        } else {
          setError('Login failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred');
      });
  };
 

  return (
    <Container maxWidth="sm">
      {isAuthenticated ? (
        // If the user is already logged in, display a logout button
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                You are already logged in
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                onClick={logout}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        // If the user is not logged in, display the login fields
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LockOutlinedIcon sx={{ fontSize: 100, color: 'primary.main' }} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={handleUsernameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Grid>
           
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                <Link to="/resetpaswword">Forgot Password?</Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </Typography>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" align="center" color="error">
                  {error}
                </Typography>
              </Grid>
          )}
        </Grid>
      </Box>
)}
    </Container>
        
  );
};

export default Login;