import {Training, Trainings} from '../TrainingsListComponent/training.model';

export interface AppState {
  activeTraining: Training | null;
  trainings: Trainings;
}

export const APP_DEFAULT_STATE: AppState = {
  activeTraining: new Training({
    pace: 4.15 * 60,
    distance: 10000,
    time: 15 * 60
  }),
  trainings: getInitTrainings()
};

function getInitTrainings(): Trainings {
  const DEFAULT_TRAININGS: Training[] = [
    new Training({
      pace: 6.0 * 60,
      distance: 21097,
      time: 2 * 60 * 60
    }),
    new Training({
      pace: 6.3 * 60,
      distance: 42195,
      time: 4 * 60 * 60
    })
  ];
  return DEFAULT_TRAININGS.reduce((trainings: Trainings, training: Training) => {
    trainings[training.id] = training;
    return trainings;
  } , new Map());
}
