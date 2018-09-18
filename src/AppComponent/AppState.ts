import {AppStateInterface} from './AppState.interface';
import {Training, Trainings} from '../_shared/models';

export class AppState {
  public trainings: Trainings;
  public activeTraining: Training | null;

  constructor(state: AppStateInterface) {
    this.trainings = state.trainings;
    this.activeTraining = state.activeTraining;
  }
}
