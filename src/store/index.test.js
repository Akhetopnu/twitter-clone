import * as actions from './actions';
import thunk from 'redux-thunk';
import { reducerRoot } from './reducers';
import { createStore, applyMiddleware } from 'redux';

const stateInitial = {};

// takes care of syncing async actions for us
const middleware = [thunk];

let store;

describe('store', () => {
  beforeEach(() => {
    store = createStore(
      reducerRoot,
      stateInitial,
      applyMiddleware(...middleware),
    );
  });

  describe('posts', () => {
    it('empty', () => {
      expect(Array.isArray(store.getState().posts.list)).toBe(true);
      expect(store.getState().posts.list.length).toBe(0);
      expect(store.getState().posts.next).toBeUndefined();
    });

    it('init', () => {
      store.dispatch(actions.creators.POSTS_INIT(5));

      expect(store.getState().posts.list.length).toBe(0);
      expect(store.getState().posts.next).toBe(5);
    });

    it('add 1', () => {
      store.dispatch(actions.creators.POSTS_INIT(5));

      const post = {
        id: 5,
        userId: 'some id',
        title: 'some title',
        body: 'some post body',
      }
      store.dispatch(actions.creators.POST_ADD(post));

      expect(store.getState().posts.list.length).toBe(1);
      expect(store.getState().posts.next).toBe(4);

      const [$post] = store.getState().posts.list;
      expect($post).toEqual(post);
    });

    it('add 2', () => {
      store.dispatch(actions.creators.POSTS_INIT(5));
      store.dispatch(actions.creators.POST_ADD({
        id: 5,
        userId: 'some id',
        title: 'some title',
        body: 'some post body',
      }));

      store.dispatch(actions.creators.POST_ADD({}));

      expect(store.getState().posts.list.length).toBe(2);
      expect(store.getState().posts.next).toBe(3);
    });
  });
});
