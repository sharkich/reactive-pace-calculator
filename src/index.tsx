import * as React from 'react';
import {createStore} from 'redux';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App/App';

// tslint:disable-next-line
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import rootReducer from './redusers';

ReactDOM.render(
<Provider store={createStore(rootReducer)}>
          <App />
        </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
