import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Atom} from '@grammarly/focal';

import {AppComponent} from './App/AppComponent';

// tslint:disable-next-line
import './index.css';

import {AppModel} from './App/App.model';
// @ts-ignore
import {APP_DEFAULT_STATE} from './App/App.state';

const state: Atom<AppModel> = Atom.create(new AppModel(APP_DEFAULT_STATE));

ReactDOM.render(
  <AppComponent state={state} />,
  document.getElementById('root') as HTMLElement
);
