import { combineReducers } from 'redux';
import * as posts from './posts';

export const reducerRoot = combineReducers({
  posts: posts.reducer,
});
