import {Counter} from './counter.model';
import {CountersActions, CountersActionsResult} from './counters.actions';

const DEFAULT_COUNTERS: Counter[] = [
  new Counter(),
  new Counter({value: 10}),
  new Counter({value: 100, name: 'Hundred\n'})
];

export function countersReducer(): Counter[] {
  return DEFAULT_COUNTERS;
}

export function activeCounterReducer(state: Counter | null = null, action: CountersActionsResult): Counter | null {
  switch (action.type) {
    case CountersActions.SELECT:
      return action.payload;

    case CountersActions.INC:
      return action.payload;

    case CountersActions.DEC:
      return action.payload;

    default:
      return state;
  }
}
