// tslint:disable
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Reducer} from 'redux';
import {AppContainer} from 'react-hot-loader';

// tslint:disable:no-import-side-effect
import './rxjs-imports';
// tslint:enable:no-import-side-effect

import {App} from './app';
import {store, browserHistory, epicMiddleware} from './store';

const renderRoot: (app: JSX.Element) => void = (app: JSX.Element) => {
  ReactDOM.render(app, document.getElementById('root'));
};

if (process.env.NODE_ENV === 'production') {
  renderRoot((
    <App store={store} history={browserHistory}/>
  ));
} else { // removed in production, hot-reload config
  // tslint:disable-next-line
  const AppContainer = require('react-hot-loader').AppContainer;
  renderRoot((
    <AppContainer>
      <App store={store} history={browserHistory}/>
    </AppContainer>
  ));

  if (module.hot) {
    // app
    module.hot.accept('./app', async () => {
      // tslint:disable-next-line
      const NextApp = (await System.import('./app')).App;
      renderRoot((
        <AppContainer>
          <NextApp store={store} history={browserHistory}/>
        </AppContainer>
      ));
    });

    // reducers
    module.hot.accept('./features/root-reducer', () => {
      const newRootReducer: Reducer = require('./features/root-reducer').default;
      store.replaceReducer(newRootReducer);
    });

    // epics
    module.hot.accept('./features/root-epic', () => {
      // tslint:disable-next-line
      const newRootEpic = require('./features/root-epic').default;
      epicMiddleware.replaceEpic(newRootEpic);
    });
  }
}
