import {Training} from './training.model';

export type TrainingsActionsType = 'TrainingsActions.ADD' | 'TrainingsActions.SELECT' | 'TrainingsActions.REMOVE';

export interface TrainingsActionsResult {
  type: TrainingsActionsType;
  payload: Training;
}

export class TrainingsActions {
  static SELECT: TrainingsActionsType = 'TrainingsActions.SELECT';
  static select(training: Training): TrainingsActionsResult {
    return {
      type: TrainingsActions.SELECT,
      payload: training
    };
  }

  static ADD: TrainingsActionsType = 'TrainingsActions.ADD';
  static REMOVE: TrainingsActionsType = 'TrainingsActions.REMOVE';
}
