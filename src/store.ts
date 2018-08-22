import {createStore, applyMiddleware, compose, Action, Middleware, Store} from 'redux';
import {createEpicMiddleware, EpicMiddleware} from 'redux-observable';
import {routerMiddleware as createRouterMiddleware} from 'react-router-redux';
import {createBrowserHistory, History} from 'history';

import {rootReducer, RootState} from 'Features/root-reducer';
import {rootEpic} from 'Features/root-epic';

const composeEnhancers: any = (
  process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

export const epicMiddleware: EpicMiddleware<Action<any>, {}, any> = createEpicMiddleware(rootEpic);
export const browserHistory: History = createBrowserHistory();
export const routerMiddleware: Middleware = createRouterMiddleware(browserHistory);

function configureStore(initialState?: RootState): Store {
  // configure middlewares
  const middlewares: Middleware[] = [
    epicMiddleware,
    routerMiddleware,
  ];
  // compose enhancers
  const enhancer: any = composeEnhancers(
    applyMiddleware(...middlewares)
  );
  // create store
  return createStore(
    rootReducer,
    // @ts-ignore
    initialState!,
    enhancer
  );
}

// pass an optional param to rehydrate state on app start
export const store: Store = configureStore();

// export store singleton instance
export default store;
