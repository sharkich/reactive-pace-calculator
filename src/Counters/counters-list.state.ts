import {AppState} from '../App/app.state';
import {CountersActionsResult} from './counters.actions';
import {Counter} from './counter.model';

export type CountersListState = Pick<AppState, 'counters' | 'activeCounter'>;

export type CountersDispatcher = (counter: Counter) => CountersActionsResult;

export interface CountersListDispatchers {
  select: CountersDispatcher;
  increase: CountersDispatcher;
  decrease: CountersDispatcher;
}
