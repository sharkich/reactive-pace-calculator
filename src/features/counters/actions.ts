import {createAction} from 'typesafe-actions';
import {FunctionActionEmpty} from '../../interfaces/functions.interfaces';

export interface SingleAction {
  type: string;
  payload?: any;
}

const INCREMENT: string = 'INCREMENT';
const ADD: string = 'ADD';

type FunctionActionAdd = ((amount: number) => { type: string; payload: number });

export const increment: FunctionActionEmpty = createAction(INCREMENT);

export const add: FunctionActionAdd = createAction(ADD, (amount: number) => ({
  type: ADD,
  payload: amount,
}));
