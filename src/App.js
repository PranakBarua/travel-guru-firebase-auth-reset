import React from 'react';
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

function App() {
  return (
    <div>
      <Router>
      <Home></Home>
        <Switch>
          <Route  exact path="/">
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
