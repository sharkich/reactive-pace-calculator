import {Training, Trainings} from '../_shared/models';

export interface AppStateInterface {
  activeTraining: Training | null;
  trainings: Trainings;
}
