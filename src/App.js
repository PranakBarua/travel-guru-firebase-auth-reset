import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Places from './components/Places/Places';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Search from './components/Search/Search';
import Booking from './components/Booking/Booking';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext=createContext();
function App() {
  const [loggedInUser,setLoggedInUser]=useState({
    isSigned:false
  })
  return (
    
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <h1>{loggedInUser.name}</h1>
      <Router>
        <Header></Header>
        <Switch>
        <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/search/:placeId">
            <Search></Search>
          </PrivateRoute>
          <Route path="/login">
            <Header></Header>
            <Login></Login>
          </Route>
          <Route path="/booking/:placeId">
            <Booking></Booking>
          </Route>
          <Route  exact path="/">
            <Home></Home>
          </Route>
        <Route path="*">
          <NotFound></NotFound>
        </Route>
        </Switch>
        
      </Router>
    </UserContext.Provider>
  );
}

export default App;
