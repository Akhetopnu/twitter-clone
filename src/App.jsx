import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Home from './Home';
import { Wall } from './Wall.jsx';
import { Post } from './Post.jsx';

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
          <Route exact path='/login' component={Login} />
          <Route exact path='/wall' component={Wall} />
          <Route path='/wall/:id' component={Post} />
        </div>
      </Router>
    );
  }
}
