import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, Store} from 'redux';

import App from './App/App';

// tslint:disable-next-line
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import rootReducer from './redusers';

const store: Store = createStore(
  rootReducer /* preloadedState, */,
  // tslint:disable-next-line
  window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
