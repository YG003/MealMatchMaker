import React, { useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Collapse,
} from '@mui/material';

const SingleRecipe = ({ recipe }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowAllDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={recipe.imageUrl}
          alt={recipe.name}
        />
        <CardHeader title={recipe.name} subheader={recipe.cuisine} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {recipe.description.substring(0, 100)}...
          </Typography>
          <Button variant="contained" color="primary" onClick={handleShowAllDetails}>
            {showDetails ? 'Hide Details' : 'All Details'}
          </Button>
          <Collapse in={showDetails}>
            <DetailedRecipe recipe={recipe} />
          </Collapse>
        </CardContent>
      </Card>
    </Grid>
  );
};

const DetailedRecipe = ({ recipe }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" component="h3">
          Ingredients:
        </Typography>
        <List dense>
          {Array.isArray(recipe.ingredients) && recipe.ingredients.map((ingredient) => (
            <ListItem key={ingredient}> {/* Use ingredient itself as key */}
              <ListItemText primary={ingredient} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" component="h3">
          Instructions:
        </Typography>
        {recipe.instructions && (  {/* Check if instructions exist */}
          (<Typography variant="body2" component="p">{recipe.instructions}</Typography>)
        )}
      </Grid>
    </Grid>
  );
};

export default SingleRecipe;