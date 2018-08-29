import {Training, Trainings} from '../_shared/Training.model';

export interface AppState {
  activeTraining: Training | null;
  trainings: Trainings;
}
