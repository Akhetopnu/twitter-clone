import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import { Login } from './components/login/Login';
import { Logout } from './components/logout/Logout';
import { Wall } from './components/wall/Wall.jsx';

export default class App extends Component {
  render() {
    return (
      <Router className='fill'>
        <div className='fill'>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/wall/:id?' component={Wall} />
            <Redirect to='/wall' />
          </Switch>
        </div>
      </Router>
    );
  }
}
