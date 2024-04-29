import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import logo from '../assets/logo.png';
import { useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'; // Import Link for navigation

const StyledImage = styled('img')({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  objectFit: 'scale-down',
  marginRight: '1rem',
  backgroundColor: '',
});

const NavBar = () => {
  const matches = useMediaQuery('(max-width: 600px)'); // Check for screens <= 600px

  const [open, setOpen] = useState(false); // State for drawer visibility

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Recipes', path: '/recipes' },
    { label: 'Profile', path: '/profile' },
    { label: 'Signup/Login', path: '/login' },
  ];

  const drawerContent = (
    <div>
      <List>
        {navigationItems.map((item, index) => (
          <ListItem key={index} button onClick={handleDrawerClose}>
            <ListItemIcon>
              {/* Add optional icon for each item */}
            </ListItemIcon>
            <Link to={item.path}>
              <ListItemText primary={item.label} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: '#37474F' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: matches ? 0 : 2 }} // Adjust margin based on screen size
            onClick={handleDrawerOpen} // Add click handler for menu icon
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <StyledImage src={logo} alt="Logo" /> {/* Render the styled image */}
          </Typography>
          {matches ? (
            <IconButton color="inherit" aria-label="open drawer">
              {/* Removed placeholder content */}
            </IconButton>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/recipes">
                Recipes
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Signup/Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        {drawerContent}
        <IconButton onClick={handleDrawerClose}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Drawer>
    </>
  );
};

export default NavBar;
