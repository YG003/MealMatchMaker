import React, { useState, useEffect, useContext } from 'react';
import { Card, CardHeader, CardContent, Avatar, Typography, Button, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Phone, LocationOn, Cake } from '@mui/icons-material';
import axios from 'axios';
import DetailedRecipe from '../components/DetailsRecipe';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { AuthContext } from '../auth-context'; 
import { Navigate } from 'react-router-dom';
import { TextField } from '@mui/material';

const Profile = () => {
  const [recipes, setRecipes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [userDetails, setUserDetails] = useState({
    type_of_meal: "",
    user: '',
    dietary_requirements: "",
    date_of_birth: "",
    bio:""
  });
  const { isAuthenticated, username, logout } = useContext(AuthContext);
  const userID = localStorage.getItem('id');
  const user = parseInt(userID);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const userId = localStorage.getItem('id');
        const user = parseInt(userId)
        const response = await axios.get(`http://localhost:8000/accounts/recipeslist/${user}/`);
        setRecipes(response.data)
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('id');
        const user = parseInt(userId);
        const response = await axios.get(`http://localhost:8000/accounts/profile/${user}/`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
    fetchRecipes();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  const handleEditProfile = () => {
    setEditing(true);
    setFormData({
      bio: userDetails.bio || '',
      dietary_requirements: userDetails.dietary_requirements || '',
      type_of_meal: userDetails.type_of_meal || '',
      date_of_birth: userDetails.date_of_birth || ''
    });
  };

  const handleSaveProfile = async (formData) => {
    // Validate user ID (assuming it's retrieved securely)
   
    if (formData.date_of_birth === ''){
      formData.date_of_birth = null
    }

    const userData = {
      user_id: user, // Use the validated user ID
      dietary_requirements: formData.dietary_requirements,
      type_of_meal: formData.type_of_meal,
      date_of_birth: formData.date_of_birth,
      bio: formData.bio,
    };
  
    
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/accounts/profile/${user}/`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Profile updated successfully:', response.data);
    const res = await axios.get(`http://localhost:8000/accounts/profile/${user}/`);
    setUserDetails(res.data);
    setEditing(false)
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error.response?.data);

    // Handle specific errors if necessary
    // ... (same as before)

      // Handle specific errors if necessary (e.g., validation errors, authentication failures)
      if (error.response?.status === 400) {
        // Handle validation errors from the server
        return Promise.reject(error.response.data);
      } else if (error.response?.status === 401) {
        // Handle authentication errors
        return Promise.reject(new Error('Unauthorized'));
      } else {
        // Re-throw other errors for generic handling
        throw error;
      }
    }

  };
  
  const handleDeleteRecipe = async (pk) => {
    const userID = localStorage.getItem('id');
    const user = parseInt(userID)
    try {
      await axios.delete(`http://localhost:8000/accounts/recipes/${pk}/${user}`);
      const response = await axios.get(`http://localhost:8000/accounts/recipeslist/${userID}/`);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar alt={username} src={userDetails.imageUrl} />}
          title={username}
          subheader={localStorage.getItem('email')}
        />
        <CardContent>
          {editing ? (
            <>
              <TextField
                name="bio"
                label="Bio"
                sx={{padding:1, margin:1}}

                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                fullWidth
                multiline
              />
              <TextField
                sx={{padding:1, margin:1}}

                name="dietary_requirements"
                label="Dietary Requirements"
                value={formData.dietary_requirements}
                onChange={(e) => setFormData({ ...formData, dietary_requirements: e.target.value })}
                fullWidth
              />
              <TextField
                name="type_of_meal"
                label="Type of Meal"
                sx={{padding:1, margin:1}}
                value={formData.type_of_meal}
                onChange={(e) => setFormData({ ...formData, type_of_meal: e.target.value })}
                fullWidth
              />
              <TextField
                sx={{padding:1, margin:1}}
                name="date_of_birth"
                label="Date of Birth"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                fullWidth
              />
              <Button variant="contained" color="primary" onClick={()=> handleSaveProfile(formData) } sx={{ mt: 2 }}>
                Save Profile
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body2" color="textSecondary" component="p">
                {userDetails.bio}
              </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <FastfoodIcon />
                  </ListItemIcon>
                  <ListItemText primary={userDetails.type_of_meal || 'Type of Meal not provided'} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <RestaurantIcon />
                  </ListItemIcon>
                  <ListItemText primary={userDetails.dietary_requirements || 'Dietary Requirements not provided'} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Cake />
                  </ListItemIcon>
                  <ListItemText primary={userDetails.date_of_birth || 'Date of Birth not provided'} />
                </ListItem>
              </List>
              <Divider sx={{ mt: 2, mb: 2 }} />
             
              <Button variant="contained" color="primary" onClick={handleEditProfile} sx={{ mt: 2 }}>
                Edit Profile
              </Button>
            </>
          )}
          <Button onClick={handleLogout} variant="contained" color="primary" sx={{ mt: 2, paddingLeft: 1, marginLeft: 1 }}>
            Logout
          </Button>
        </CardContent>
      </Card>

      <div style={{ marginTop: '20px' }}>
        <h1>Favourites</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {recipes.map(recipe => (
            <DetailedRecipe key={recipe.id} recipe={recipe} handleDeleteRecipe={handleDeleteRecipe} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
