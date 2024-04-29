import React, { useState } from 'react';
import {
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Box,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const userData = {
      username: name,
      email: email,
      password: password,
    };
    
    axios.post('http://localhost:8000/accounts/signup/', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response.data);
        navigate('/login');
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };
  return (
    <div>
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LockOutlinedIcon sx={{ fontSize: 100, color: 'primary.main' }} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Sign Up
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={handleEmailChange}
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
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" fullWidth onClick={handleSubmit}>
                Sign Up
              </Button>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" align="center" color="error">
                  {error.message}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Already have an account? <Link to="/login">Login</Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default SignUp;