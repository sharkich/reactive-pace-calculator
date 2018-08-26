import {Counter} from './counter.model';

export type CountersActionsType = 'CountersActions.SELECT' | 'CountersActions.INC' | 'CountersActions.DEC';

export interface CountersActionsResult {
  type: string;
  payload: Counter;
}

export class CountersActions {
  static SELECT: CountersActionsType = 'CountersActions.SELECT';
  static select(counter: Counter): CountersActionsResult {
    return {
      type: CountersActions.SELECT,
      payload: new Counter(counter)
    };
  }

  static INC: CountersActionsType = 'CountersActions.INC';
  static increase(counter: Counter): CountersActionsResult {
    return {
      type: CountersActions.INC,
      payload: new Counter(counter.inc())
    };
  }

  static DEC: CountersActionsType = 'CountersActions.DEC';
  static decrease(counter: Counter): CountersActionsResult {
    return {
      type: CountersActions.DEC,
      payload: new Counter(counter.dec())
    };
  }
}
