import {Training} from './training.model';

export type TrainingsActionsType = 'ADD' | 'SELECT' | 'REMOVE';

export interface TrainingsActionsResult {
  type: TrainingsActionsType;
  payload: Training[];
}

export class TrainingsActions {

  static ADD: TrainingsActionsType = 'ADD';
  static SELECT: TrainingsActionsType = 'SELECT';
  static REMOVE: TrainingsActionsType = 'REMOVE';
}
