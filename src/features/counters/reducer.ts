import {combineReducers, Reducer} from 'redux';
import { getType, getReturnOfExpression } from 'typesafe-actions';

import * as countersActions from './actions';
import {SingleAction} from './actions';

const returnsOfActions: SingleAction[] = Object.values(countersActions).map(getReturnOfExpression);
export type Action = typeof returnsOfActions[number];

export interface State {
  readonly reduxCounter: number;
}

export const reducer: Reducer = combineReducers<State, Action>({
  reduxCounter: (state: number = 0, action: Action) => {
    switch (action.type) {
      case getType(countersActions.increment):
        return state + 1; // action is type: { type: "INCREMENT"; }

      case getType(countersActions.add):
        return state + action.payload; // action is type: { type: "ADD"; payload: number; }

      default:
        return state;
    }
  },
});
