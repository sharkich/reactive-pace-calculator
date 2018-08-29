import {Training, Trainings} from '../_shared/models';

export interface AppState {
  activeTraining: Training | null;
  trainings: Trainings;
}
