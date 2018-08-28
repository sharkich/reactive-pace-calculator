import {Training, Trainings} from '../Trainings/training.model';
import {AppState} from './App.state';

export class AppModel {

  public readonly trainings: Trainings;
  public readonly activeTraining: Training | null;

  constructor(state: AppState) {
    this.trainings = state.trainings;
    this.activeTraining = state.activeTraining;
  }

}
