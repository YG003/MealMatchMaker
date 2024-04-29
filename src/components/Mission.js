import React from 'react';
import { Typography } from '@mui/material'; // Import for responsive text size

const Mission = () => {
  return (
    <div className="mission" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
      <Typography variant="h5" component="h1" align="center">
        Our Mission
      </Typography>
      <Typography variant="body1" align="center" sx={{ maxWidth: '60%', fontSize: '16px', lineHeight: '1.5' }}>
      Our mission is to revolutionize meal planning by making it simpler and more sustainable. We are dedicated to helping you utilize what you already have in your kitchen, reducing food waste and promoting healthier eating habits. Our user-friendly web application allows you to input your available ingredients and instantly receive tailored recipe suggestions that fit your dietary preferences and needs. By empowering you with tools to make informed culinary decisions, we aim to enhance your cooking experience, save you money, and contribute to a more sustainable world. Join us in transforming how we think about and prepare our meals, making every ingredient count.
      </Typography>
    </div>
  );
};

export default Mission;
