import {Training} from '../Trainings/training.model';
import {TrainingsActions, TrainingsActionsResult} from '../Trainings/trainings.actions';

export function paceCalculatorReducer(state: Training | null = null, action: TrainingsActionsResult): Training | null {
  switch (action.type) {

    case TrainingsActions.SELECT:
      return action.payload;

    default:
      return state;
  }
}
