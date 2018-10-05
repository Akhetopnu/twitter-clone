import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Home from './Home';
import Wall from './Wall';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/wall'>Wall</Link></li>
            </ul>
          </div>
          <hr />

          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/Wall' component={Wall} />
        </div>
      </Router>
    );
  }
}
