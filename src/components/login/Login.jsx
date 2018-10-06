import React, { Component } from 'react';

export class Login extends Component {
  render() {
    return (
      <div>
        <div>
          <span>Login</span>
          <input type='text' pattern='.{5,}' required />
        </div>
        <div>
          <span>Password:</span>
          <input type='password' pattern='' title='Password must be at least 8 characters long, contains at least 1 small letter, one capital letter and 1 number' required />
        </div>
      </div>
    );
  }

  validate() {
    console.log('validating...');
  }
}
