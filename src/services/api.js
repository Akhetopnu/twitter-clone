const URL = 'https://jsonplaceholder.typicode.com';

const get = (id = '') =>
  fetch(URL + '/posts/' + id)
    .then(response => response.json())
    .catch(() => undefined);

export const fetch_by_id = get;

export const fetch_count = () =>
  get()
    .then(list =>
      list
        ? list.length
        : NaN
    );
