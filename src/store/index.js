import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { reducerRoot } from './reducers';

const stateInitial = {};

// takes care of syncing async actions for us
const middleware = [thunk];

export const store = createStore(
  reducerRoot,
  stateInitial,
  applyMiddleware(...middleware),
);
