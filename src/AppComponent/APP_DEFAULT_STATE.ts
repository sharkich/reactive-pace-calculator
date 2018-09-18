import {AppStateInterface} from './AppState.interface';
import {Training, Trainings} from '../_shared/models';

const DEFAULT_TRAININGS: Trainings = [
  new Training({
    name: '10 km training',
    pace: 4 * 60 + 15,
    distance: 10000,
    time: 15 * 60
  }),
  new Training({
    name: 'Half Marathon',
    pace: 5 * 60 + 30,
    distance: 21097,
    time: 1 * 60 * 60 + 58 * 60 + 11
  }),
  new Training({
    name: 'Marathon',
    pace: 6 * 60 + 31,
    distance: 42195,
    time: 4 * 60 * 60
  })
];

export const APP_DEFAULT_STATE: AppStateInterface = {
  activeTraining: null,
  trainings: [...DEFAULT_TRAININGS]
};
