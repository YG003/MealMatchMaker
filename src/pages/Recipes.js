import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import FavoriteRecipe from '../components/FavoriteRecipe';


const Recipes = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [recipe, setRecipe] = useState([]);
  const [suggestRecipe, setSuggestRecipe] = useState([]);
  const [dietFilter, setDietFilter] = useState('all'); // State for veg/non-veg filter

  const handleIngredientChange = (event) => {
    setNewIngredient(event.target.value);
  };
  const deleteIngredient = (index) => {
    setIngredients(ingredients.filter((ingredient, i) => i !== index));
  };
  const addIngredient = () => {
    if (newIngredient === '') {
      alert("Add ingredient");
      return;
    }
    setIngredients([...ingredients, newIngredient]);
    setNewIngredient(''); // Clear input field after adding
  };
  
  
  const suggestRecipes = async (ingredientList) => {
    let veg = false
    if(dietFilter==="veg"){ 
      veg =true
    }
    else {
      veg = false}
    const api = await fetch(`https://api.spoonacular.com/recipes//findByIngredients?ingredients=${ingredientList.join(',')}&vagetarian=${veg}&number=10&apiKey=${process.env.REACT_APP_API_KEY}`);
    const data = await api.json();
    console.log(data);
    setSuggestRecipe(data)

  
    
   

  };
 


  const handleDietChange = (event) => {
    setDietFilter(event.target.value);
  };

  return (
    <>
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h5" align="center">
          Find Recipes by Ingredients
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              label="Add Ingredient"
              variant="outlined"
              fullWidth
              value={newIngredient}
              onChange={handleIngredientChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <RadioGroup value={dietFilter} onChange={handleDietChange}>
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel value="veg" control={<Radio />} label="Vegetarian" />
                <FormControlLabel value="non-veg" control={<Radio />} label="Non-Veg" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth onClick={addIngredient}>
              Add Ingredient
            </Button>
            
          </Grid>
        </Grid>
        {ingredients.length > 0 && (
          <List dense sx={{ mt: 2, width: '100%' }}>
            {ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemText primary={ingredient} />
                <Button onClick={() => deleteIngredient(index)}>
               <DeleteIcon sx={{color:'red'}}/>
              </Button>
              </ListItem>
            ))}
          </List>
        )}
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={() => suggestRecipes(ingredients)}
          sx={{ mt: 2 }}
          >
          Suggest Recipes
        </Button>
        
          </Box>
    </Container>
    <Grid 
  container 
  direction="column"
  spacing={2} 
  sx={{ 
    padding: '16px', // Adjust padding for small screens
    margin: '0 auto', 
    maxWidth: '100%', // Adjust maxWidth for small screens
    width: '100%', // Ensure the Grid takes full width on small screens
    alignItems: 'center',
    '@media (min-width: 600px)': { // Adjust styles for screens wider than 600px
      maxWidth: 600, // Set maxWidth for larger screens
    },
    '@media (min-width: 960px)': { // Adjust styles for screens wider than 960px
      maxWidth: 960, // Set maxWidth for larger screens
    },
    '@media (min-width: 1280px)': { // Adjust styles for screens wider than 1280px
      maxWidth: 1800, // Set maxWidth for larger screens
      padding: '0px', // Adjust padding for larger screens
    },
  }}
>
  {suggestRecipe.map((recipe) => (
    <Grid item key={recipe.id}>
      <FavoriteRecipe recipe={recipe} />
    </Grid>
  ))}
  
  {suggestRecipe.length === 0 && ( // Handle empty data case
    <Grid item>
      <Typography 
        variant="h6" 
        component="h3" 
        align="center" 
        sx={{ 
          margin: '20px 0', 
          fontSize: 18, 
          fontWeight: 500, 
          color: 'gray'
        }}
      >
        No recipes found.
      </Typography>
    </Grid>
 
  )}
</Grid>

          </>
  );
};

export default Recipes;