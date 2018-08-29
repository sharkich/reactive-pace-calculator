import {Training, Trainings} from '../_shared/Training.model';
import {AppState} from './AppState';

export class AppModel {
  public readonly trainings: Trainings;
  public readonly activeTraining: Training | null;

  constructor(state: AppState) {
    this.trainings = state.trainings;
    this.activeTraining = state.activeTraining;
  }
}
