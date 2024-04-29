import React, { useState } from 'react';
import { Grid, Typography, Card, CardHeader,Scroll, CardContent, CardMedia,  ListItem, ListItemText, Button, Modal, Paper } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../auth-context'; // Import the AuthContext
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import './style.css';

const RecipeCard = ({ recipe }) => {
  const [open, setOpen] = useState(false);
  const [singleRecipe, setSingleRecipe] = useState('');
  const { isAuthenticated } = React.useContext(AuthContext);

  const handleOpen = async (recipeId) => {
    try {
      const apiUrl = ` https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
     
      setSingleRecipe(data);
     
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToFavorites = async (recipe) => {
    try {
      const userId = localStorage.getItem('id');
      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }
      const aisles = recipe.extendedIngredients.map(ingredient => ingredient.aisle).filter(Boolean);
    const formattedAisles = aisles.join(', ');
    
      
      const recipeData = {
        title: recipe.title,
        picture_url: recipe.image,
        summary: recipe.summary,
        ingredients: formattedAisles,
        user: userId,
      };
      const url = "http://localhost:8000/accounts/addrecipes/";
      const response = await axios.post(url, recipeData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      alert('Favorite recipe added successfully:');
    } catch (error) {
      console.error('Error adding recipe to favorites:', error.response?.data);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={8} lg={8} xl={6} >
        <Card sx={{
  marginBottom: 2,
  maxWidth: '100%',
  width: '1200px',
  '@media (max-width: 600px)': {
    width: '300px'
  }
}}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={recipe.image}
                alt={recipe.title}
                sx={{
                  height: 250,
                  objectFit: 'cover',
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Ingredients:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {recipe.usedIngredients.map((ingredient, index) => (
                    <span key={ingredient.id}>{index > 0 ? ', ' : ''}{ingredient.originalName}</span>
                  ))}
                </Typography>
                {recipe.missedIngredients.length > 0 && (
                  <>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Missing Ingredients:</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {recipe.missedIngredients.map((ingredient, index) => (
                        <span key={ingredient.id}>{index > 0 ? ', ' : ''}{ingredient.originalName}</span>
                      ))}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen(recipe.id)}
            sx={{ marginTop: 2, width: '100%' }}
          >
            Details
          </Button>
        </Card>
      </Grid>

      {singleRecipe && (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="recipe-details-modal-title"
        aria-describedby="recipe-details-modal-description"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
          width: "100%",
        }}
      >
        <div className="custom-scrollbar">
        <Paper
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 1200,
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            '@media (max-width: 600px)': {
              width: '90%',
              height: '90%',
              top: 0,
              left: 0,
              transform: 'none',
              borderRadius: 0,
            },
            '@media (min-width: 1200px)': {
              width: 800,
              maxHeight: 600,
              overflowY: 'auto',
            },
          }}
        >
          
            <Card sx={{ mb: 2 }}>
              <CardHeader title={singleRecipe.title} />
              <CardMedia
                component="img"
                image={singleRecipe.image}
                alt={singleRecipe.title}
                sx={{ height: 200, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Ingredients
                </Typography>
                <Typography>

                {singleRecipe.extendedIngredients.map((ingredient, index) => (
                  <span key={ingredient.id}>{index > 0 ? ', ' : ''}{ingredient.originalName}</span>
                ))}
                </Typography>
                <h4>Summary</h4>
      
                <Typography
                  variant="body2"
                  component="div"
                  dangerouslySetInnerHTML={{
                    __html: singleRecipe.summary
                  }}
                  />
              </CardContent>
            </Card>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              sx={{ mt: 2, width: '40%', padding: 2, margin:1 }}
            >
              Close
            </Button>
            {isAuthenticated ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToFavorites(singleRecipe)}
                sx={{ mt: 2, width: '40%', padding: 2, margin:1  }}
              >
                Add to Favorites
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                
                sx={{ mt: 2, width: '40%', padding: 2,margin:1 }}
                >
                Login to  <BookmarksIcon/> 
                <a href='/login'>Login</a>
              </Button>
            )}
          
        </Paper>
            </div> 
      </Modal>
        
      )}
    </Grid>
  );
};

export default RecipeCard;
