import * as types from './types';

export const POSTS_INIT = count => ({
  type: types.POSTS_INIT,
  payload: count,
});

export const POST_ADD = post => ({
  type: types.POST_ADD,
  payload: post,
});
