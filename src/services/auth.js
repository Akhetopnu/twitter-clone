import * as storage from './storage';

export function login () {}
export function logout () {
  storage.wipe();

  window.location.replace('/login');

  // tu uzyj react routera do redirecta do /login
}
