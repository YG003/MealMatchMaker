import React, { useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const PasswordReset = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()
 
  const handleReset = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/accounts/password-reset/', { username })
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
        } else {
          setError('Error sending password reset email');
        }
      })
      .catch((error) => {
        setError('Error sending password reset email');
      });
  };

  return (
    <Grid container sx={{padding:1,margin:1, maxWidth:"1200px"}} spacing={2} justify="center" direction="column" alignItems="center">
      {success ? (
        <Grid item>
          <Alert severity="success">Password reset email sent successfully!</Alert> 
          <Button  sx={{padding:"10px", margin:"7px"}} onClick={navigate('/resetpaswword-token')}> Goto to reset link</Button>
        </Grid>
       
      ) : (
        <Grid item component="form" onSubmit={handleReset}>
          <Grid item>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Button sx={{padding:"10px", margin:"7px"}} variant="contained" type="submit">Reset Password</Button>
          </Grid>
          {error && (
            <Grid item>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default PasswordReset;