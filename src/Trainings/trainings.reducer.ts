import {Training} from './training.model';
import {TrainingsActions, TrainingsActionsResult} from './trainings.actions';

const DEFAULT_TRAININGS: Training[] = [
  new Training({
    pace: 6.00 * 60,
    distance: 21097,
    time: 2 * 60 * 60
  }),
  new Training({
    pace: 6.30 * 60,
    distance: 42195,
    time: 2 * 60 * 60
  })
];

export function trainingsInitReducer(): Training[] {
  console.log('init.trainings.reducer');
  return DEFAULT_TRAININGS;
}

export function trainingsReducer(state: Training | null = null, action: TrainingsActionsResult): Training | null {
  switch (action.type) {

    case TrainingsActions.SELECT:
      return action.payload;

    default:
      console.log('default.trainings.reducer');
      return state;
  }
}
