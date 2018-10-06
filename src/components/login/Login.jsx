import './Login.scss';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as auth from '../../services/auth';

const instruction = 'Password must be at least 8 characters long, contains at least 1 small letter, one capital letter and 1 number';

export class Login extends Component {
  constructor({ history }) {
    super();

    this.submit = this.submit.bind(this);
    this.update = this.update.bind(this);
    this.history = history;
    this.state = {
      login: '',
      password: '',
    };
  }


  render() {
    if (auth.isAuthenticated) {
      return <Redirect to='/wall' />
    }

    const { login, password } = this.state;

    return (
      <div className='login-container'>
        <form className='login' onSubmit={this.submit} method=''>
          <div className='login-entry'>
            <span>Login</span>
            <input
              type='text'
              name='login'
              minLength='5'
              title='Login must be at least 5 characters long.'
              placeholder='type dat login'
              onChange={this.update}
              required
            />
          </div>
          <div className='login-entry'>
            <span>Password:</span>
            <input
              type='password'
              name='password'
              minLength='8'
              title={instruction}
              placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
              onChange={this.update}
              required
            />
          </div>
          <button type='submit'>Log in</button>
        </form>
      </div>
    );
  }

  validate() {
    console.log('validating...');
  }

  update(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submit(event) {
    event.preventDefault();
    const form = event.target;
    const login = form.login.value;
    const password = form.password.value;

    // for password
    const validators = [/\d/, /[a-z]/, /[A-Z]/];
    const is_valid = validators.every(re => re.test(password));
    if (!is_valid) {
      return password.setCustomValidity(instruction);
    }

    auth.login({ login, password });
    this.history.push('/wall');
  }
}
