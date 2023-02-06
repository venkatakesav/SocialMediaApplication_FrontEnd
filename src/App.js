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
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './user/pages/Auth';

const App = () => {
  return (
    <Router>
      <MainNavigation/>
      <main>
      <Routes>
        <Route path="/" exact element={<Users/>}></Route>
        <Route path="/:userId/places" exact element={<UserPlaces/>}></Route>
        <Route path="/places/new" exact element={<NewPlace/>}></Route>
        <Route path="/places/:placeId" exact element={<UpdatePlace/>}></Route>
        <Route path="/Auth" exact element={<Auth></Auth>}></Route>
      </Routes>
      </main>
    </Router>
  );
};

export default App;
