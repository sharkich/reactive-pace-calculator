import {Training} from '../_shared/Training.model';
import {Trainings} from '../_shared/Trainings.model';

export interface AppState {
  activeTraining: Training | null;
  trainings: Trainings;
}
