import {AppState} from './AppState';
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
    pace: 6 * 60 + 30,
    distance: 21097,
    time: 2 * 60 * 60
  }),
  new Training({
    name: 'Marathon',
    pace: 6 * 60 + 45,
    distance: 42195,
    time: 4 * 60 * 60
  })
];

export const APP_DEFAULT_STATE: AppState = {
  activeTraining: DEFAULT_TRAININGS[1],
  trainings: [...DEFAULT_TRAININGS]
};
