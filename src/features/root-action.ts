// RootActions
import { RouterAction, LocationChangeAction } from 'react-router-redux';
import { getReturnOfExpression } from 'utility-types';

import * as countersActions from './counters/actions';

// tslint:disable-next-line
export const actions = {
  counters: countersActions,
};

// tslint:disable-next-line
const returnsOfActions = [
  ...Object.values(countersActions),
].map(getReturnOfExpression);

type AppAction = typeof returnsOfActions[number];
type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | AppAction
  | ReactRouterAction;
