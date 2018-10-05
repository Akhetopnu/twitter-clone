export const URL = 'https://jsonplaceholder.typicode.com';

// export const fetch_all = () => {
//   return Promise.resolve(
//     Array.from({ length: 5 }).map((_, i) => ({
//       userId: i % 2,
//       id: i,
//       title: Math.random().toString().repeat(5).slice(0, 40),
//       body: Math.random().toString().repeat(5).slice(0, 100),
//     }))
//   );
// }

export const fetch_all = () => {
  if (localStorage.list) {
    return Promise.resolve(JSON.parse(localStorage.list));

  }
  return fetch(URL + '/posts')
    .then(x => x.json())
    .then(list => {
      localStorage.list = JSON.stringify(list);
      return list;
    });
}

// export const fetch = post_id =>
//   fetch(URL + '/' + post_id)
//     .then(x => x.json());
