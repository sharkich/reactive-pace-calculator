import {Training, Trainings} from '../_shared/Training.model';
import {AppState} from './AppState';

const DEFAULT_TRAININGS: Training[] = [
  new Training({
    name: '10 km training',
    pace: Math.round(4.15 * 60),
    distance: 10000,
    time: 15 * 60
  }),
  new Training({
    name: 'Half Marathon',
    pace: 6.0 * 60,
    distance: 21097,
    time: 2 * 60 * 60
  }),
  new Training({
    name: 'Marathon',
    pace: 6.3 * 60,
    distance: 42195,
    time: 4 * 60 * 60
  })
];

export const APP_DEFAULT_STATE: AppState = {
  activeTraining: DEFAULT_TRAININGS[1],
  trainings: DEFAULT_TRAININGS.reduce((trainings: Trainings, training: Training) => {
    trainings[training.id] = training;
    return trainings;
  }, new Map())
};
