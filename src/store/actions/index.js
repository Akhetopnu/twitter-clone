import * as API from '../../services/api';
import * as types from './types';

export * from './types';

export const getCount = () => async dispatch => {
  const posts_count = await API.fetch_count();

  dispatch({
    type: types.POSTS_INIT,
    payload: posts_count,
  });
};

export const get = id => async dispatch => {
  const post = await API.fetch_by_id(id);

  dispatch({
    type: types.POST_ADD,
    payload: post,
  });
};

