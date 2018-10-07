import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from './Login.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Login />

  , div);
  ReactDOM.unmountComponentAtNode(div);
});

const { validate } = Login.prototype;

describe('.validate', () => {
  it('all good', () => {
    const [login, password] = ['abcde', 'abcDEF12'];
    expect(validate(login, password)).toBe(true);
  });

  it('login is too short', () => {
    const [login, password] = ['abcde'.slice(0, -1), 'abcDEF12'];
    expect(validate(login, password)).toBe(false);
  });

  it('password is too short', () => {
    const [login, password] = ['abcde', 'abcDEF12'.slice(0, -1)];
    expect(validate(login, password)).toBe(false);
  });

  it('password does not contain uppercase letters', () => {
    const [login, password] = ['abcde', 'abcdef12'];
    expect(validate(login, password)).toBe(false);
  });

  it('password does not contain any digits', () => {
    const [login, password] = ['abcde', 'abcDEFgh'];
    expect(validate(login, password)).toBe(false);
  });
});

describe('.update', () => {
  let div;
  let component;

  beforeEach(() => {
    div = document.createElement('div');
    component = ReactDOM.render(<Login />, div);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('updates component-local state (login)', () => {
    expect(component.state.login).toBe('');

    const username = 'username';

    component.update({
      target: {
        name: 'login',
        value: username,
      },
    });

    expect(component.state.login).toBe(username);
  });

  it('updates component-local state (password)', () => {
    expect(component.state.password).toBe('');

    const username = 'username';

    component.update({
      target: {
        name: 'password',
        value: username,
      },
    });

    expect(component.state.password).toBe(username);
  });

});
