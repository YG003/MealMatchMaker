import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  TextField,
  Button,
 
  Alert
} from '@mui/material';

const PasswordResetConfirm = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleConfirm = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/accounts/password-reset-confirm/', {
      token: token,
      password: password
    })
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
        } else {
          setError(response.data.error);
        }
      })
      .catch((error) => {
        setError('Error resetting password');
      });
  };

  return (
    <Container maxWidth="sm" className="password-reset-confirm">
      {success ? (
        <Alert severity="success" className="success-message">
          Password reset successfully!
        </Alert>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Token"
              variant="outlined"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="New Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className="btn"
              onClick={handleConfirm}
              fullWidth
            >
              Reset Password
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error" className="error-message">
                {error}
              </Alert>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default PasswordResetConfirm;