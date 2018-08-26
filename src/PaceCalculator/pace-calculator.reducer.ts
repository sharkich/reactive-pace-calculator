import {Training} from '../Trainings/training.model';

export function paceCalculatorReducer(): Training {
  return new Training({
    pace: 5.00 * 60,
    distance: 21097,
    time: 2 * 60 * 60
  });
}
