import React from 'react';
import * as auth from '../../services/auth';
import { Redirect } from 'react-router-dom';

export const Logout = () => {
  auth.logout();

  return <Redirect to='/login' />
};
