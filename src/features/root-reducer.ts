import {combineReducers, Reducer} from 'redux';
import { routerReducer as router, RouterState } from 'react-router-redux';

import { reducer as counters, State as CountersState } from './counters/reducer';

// tslint:disable-next-line
interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
  router: RouterState;
  counters: CountersState;
}

import { RootAction } from './root-action';
export const rootReducer: Reducer = combineReducers<RootState, RootAction>({
  router,
  counters,
});
