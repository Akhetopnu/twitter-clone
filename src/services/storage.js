export function user () {
  const str = sessionStorage.getItem('user');
  if (!str) {
    return;
  }

  try {
    return JSON.parse(str);
  } catch (error) {
    return console.warn('Failed to parse sessionStorage value.');
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
