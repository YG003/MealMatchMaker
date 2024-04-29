import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import "./profile.css"

const DetailedRecipe = ({ recipe, handleDeleteRecipe }) => {
  const [showSummary, setShowSummary] = useState(false);

  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  return (
    <div key={recipe.id} style={{ margin: '10px', maxWidth: '300px' , }}>
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
        <h3>{recipe.title}</h3>
        <p>{recipe.ingredients}</p>
        <img src={recipe.picture_url} alt="My Image" style={{ width: '100%' }} />
        <div style={{ marginTop: '10px' }}>
          <Button onClick={() => handleDeleteRecipe(recipe.id)} variant="contained" color="secondary" style={{ marginRight: '10px' }}>Delete</Button>
          <Button onClick={toggleSummary} variant="contained" color="primary">{showSummary ? 'Hide Details' : 'Show Details'}</Button>
        </div>
        {showSummary && (
          <Typography
            variant="body2"
            component="div"
            dangerouslySetInnerHTML={{
              __html: recipe.summary
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DetailedRecipe;
