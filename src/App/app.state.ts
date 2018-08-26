import {Counter} from '../Counters/counter.model';
import {Training} from '../Trainings/training.model';

export interface AppState {
  trainings: Training[];

  counters: Counter[];
  activeCounter: Counter;
}
