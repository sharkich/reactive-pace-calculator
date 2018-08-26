import {Training} from '../Trainings/training.model';

export type PaceCalculatorActionsType = 'PaceCalculatorActionsType.SAVE';

export interface PaceCalculatorActionsTypeResult {
  type: PaceCalculatorActionsType;
  payload: Training;
}

export class PaceCalculatorActions {

  static SAVE: PaceCalculatorActionsType = 'PaceCalculatorActionsType.SAVE';
  static save(training: Training): PaceCalculatorActionsTypeResult {
    return {
      type: PaceCalculatorActions.SAVE,
      payload: training
    };
  }

}
