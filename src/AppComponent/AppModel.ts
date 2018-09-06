import {AppState} from './AppState';
import {Training, Trainings} from '../_shared/models';

export class AppModel {
  public trainings: Trainings;
  public activeTraining: Training | null;

  constructor(state: AppState) {
    this.trainings = state.trainings;
    this.activeTraining = state.activeTraining;
  }
}
