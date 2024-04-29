import React from 'react';
import { Button } from '@mui/material'; // Import Button component
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

import Header from '../components/Header';
import Mission from '../components/Mission';

const Home = () => {
  const navigate = useNavigate(); // Get the navigation function

  const handleGetStarted = () => {
    navigate('/recipes'); // Navigate to the "/recipes" route
  };

  return (
    <>
      <Header />
      <Mission />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <Button variant="contained" color="primary" onClick={handleGetStarted}>
          Get Started
        </Button>
      </div>
    </>
  );
};

export default Home;
