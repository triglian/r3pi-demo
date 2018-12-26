import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { ApplicationState, rootReducer } from './store';

export default function configureStore(
  initialState: ApplicationState
): Store<ApplicationState> {
  const composeEnhancers = composeWithDevTools({});

  const store: Store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
