import * as API from '../../services/api';
import * as types from './types';
import * as creators from './creators';

export * from './types';
export { creators };

export const getCount = () => async dispatch => {
  const posts_count = await API.fetch_count();

  dispatch(creators.POSTS_INIT(posts_count));
};

export const get = id => async dispatch => {
  const post = await API.fetch_by_id(id);

  dispatch(creators.POST_ADD(post));
};

