import React from 'react';
import { Grid } from '@mui/material';
import image1 from '../assets/banner.png';

const Header = () => {
  return (
    <Grid sx={{ padding: 1, margin: 0 }} container justifyContent="center">
      <Grid item xs={12} md={12} lg={12}>
        <img src={image1} alt="Header Image" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
      </Grid>
    </Grid>
  );
};

export default Header;