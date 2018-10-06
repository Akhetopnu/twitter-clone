import * as storage from './storage';

export let isAuthenticated = !!storage.user();

export function login (user) {
  storage.set(user);
  isAuthenticated = true;
}
export function logout () {
  storage.wipe();
  isAuthenticated = false;
}
