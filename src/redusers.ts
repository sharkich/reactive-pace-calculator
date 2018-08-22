import {combineReducers, Reducer} from 'redux';

import {activeCounterReducer, countersReducer} from './Counters/counters.reducer';

const rootReducer: Reducer<any> = combineReducers({
  counters: countersReducer,
  activeCounter: activeCounterReducer
});

export default rootReducer;
