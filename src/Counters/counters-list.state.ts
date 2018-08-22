import {AppState} from '../App/app.state';

export type CountersListState = Pick<AppState, 'counters' | 'activeCounter'>;
