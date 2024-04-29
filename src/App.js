import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './auth-context'; // Import your context API

import Nav from './components/Nav';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PasswordReset from './pages/PaswordReset';
import PasswordResetConfirm from './pages/PasswordResetConfirm';
import DetailsRecipe from './components/DetailsRecipe';

function App() {
  const { isAuthenticated } = React.useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:title" element={<DetailsRecipe />}/>
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Login />}
          /> {/* Only show Profile if user is authenticated */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetpaswword" element={<PasswordReset/>}/>
          <Route path="/resetpaswword-token" element={<PasswordResetConfirm/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;