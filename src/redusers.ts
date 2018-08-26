import {combineReducers, Reducer} from 'redux';

import {activeCounterReducer, countersReducer} from './Counters/counters.reducer';
import {trainingsInitReducer, trainingsReducer} from './Trainings/trainings.reducer';

const rootReducer: Reducer<any> = combineReducers({
  counters: countersReducer,
  activeCounter: activeCounterReducer,

  trainings: trainingsInitReducer,
  activeTraining: trainingsReducer
});

export default rootReducer;
