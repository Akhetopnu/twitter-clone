export let isAuthenticated = false;

export function authenticate (cb) {
  isAuthenticated = true;
  setTimeout(cb, 100); // fake async
}

export function signout (cb) {
  isAuthenticated = false;
  setTimeout(cb, 100);
}
