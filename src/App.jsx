import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import { Login } from './login/Login';
import { Wall } from './wall/Wall.jsx';
import { Tweet } from './wall/tweet/Tweet.jsx';

export default class App extends Component {
  render() {
    return (
      <Router className='fill'>
        <div className='fill'>
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
          <Route path='/wall/:id' component={Tweet} />
        </div>
      </Router>
    );
  }
}
