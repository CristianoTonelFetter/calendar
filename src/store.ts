import { createStore, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { rootReducer, AppState } from './reducers/rootReducer';
import { AppActions } from './actions';

function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>),
      ((window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()) ||
        compose
    )
  );
  return store;
}

export default configureStore();
