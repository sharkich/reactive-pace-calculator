import {combineReducers, Reducer} from 'redux';

import {countersReducer} from './Counters/counters.reducer';

const rootReducer: Reducer<any> = combineReducers({
  counters: countersReducer
});

export default rootReducer;
