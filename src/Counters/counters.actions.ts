import {Counter} from './counter.model';

export type CountersActionsType = 'SELECT' | 'INC' | 'DEC';
export interface CountersActionsResult {
  type: string;
  payload: Counter;
}

export class CountersActions {

  static SELECT: CountersActionsType = 'SELECT';
  static select(counter: Counter): CountersActionsResult {
    console.log(CountersActions.SELECT, counter);
    return {
      type: CountersActions.SELECT,
      payload: counter
    };
  }

  static INC: CountersActionsType = 'INC';
  static increase(counter: Counter): CountersActionsResult {
    console.log(CountersActions.INC, counter);
    return {
      type: CountersActions.INC,
      payload: new Counter(counter.inc())
    };
  }

  static DEC: CountersActionsType = 'DEC';
  static decrease(counter: Counter): CountersActionsResult {
    console.log(CountersActions.DEC, counter);
    return {
      type: CountersActions.DEC,
      payload: new Counter(counter.dec())
    };
  }

}
