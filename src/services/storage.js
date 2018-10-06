export function user () {
  const str = sessionStorage.getItem('user`');
  if (!str) {
    console.warn('You are a guest.');
    return;
  }

  try {
    return JSON.parse(str);
  } catch (error) {
    console.error('Failed to parse sessionStorage value.');
    return;
  }
}

export function set (user) {
  if (Object.prototype.toString.call(user) !== '[object Object]') {
    throw new Error('What do you think you\'re doing?')
  }

  sessionStorage.setItem('user', JSON.stringify(user));
}
export function wipe () {
  sessionStorage.clear();
}
