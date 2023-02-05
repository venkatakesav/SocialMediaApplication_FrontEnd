import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
  return (
    <Router>
      <MainNavigation/>
      <main>
      <Routes>
        <Route path="/" exact element={<Users/>}></Route>
        <Route path="/:userId/places" exact element={<UserPlaces/>}></Route>
        <Route path="/places/new" exact element={<NewPlace/>}></Route>
      </Routes>
      </main>
    </Router>
  );
};

export default App;
