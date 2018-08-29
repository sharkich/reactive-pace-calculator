import {AppState} from './AppState';
import {Training, Trainings} from '../_shared/models';

export class AppModel {
  public readonly trainings: Trainings;
  public readonly activeTraining: Training | null;

  constructor(state: AppState) {
    this.trainings = state.trainings;
    this.activeTraining = state.activeTraining;
  }
}
