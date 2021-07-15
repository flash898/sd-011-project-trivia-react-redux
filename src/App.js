import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import GameScreen from './components/GameScreen';

// import logo from './trivia.png';
// <img src={ logo } className="App-logo" alt="logo" />

import Login from './components/Login';
import Config from './components/Config';

export default function App() {
  return (
    <Switch>
      <Route exact path="/game" component={ GameScreen } />
      <Route exact path="/config" component={ Config } />
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Header } />
    </Switch>
  );
}
