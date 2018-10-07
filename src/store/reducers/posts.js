import { POSTS_INIT, POST_ADD } from '../actions';

const stateInitial = {
  list: [],
  next: undefined,
};

export function reducer(state = stateInitial, { type, payload }) {
  switch (type) {
    case POSTS_INIT: {
      console.log('posts init!', payload);
      return {
        ...state,
        next: payload,
      };
    }
    case POST_ADD: {
      console.log('adding a new post:', payload, [...state.list, payload]);
      return {
        ...state,
        list: [...state.list, payload],
        next: state.next - 1,
      };
    }
    default: {
      return state;
    }
  }
}
