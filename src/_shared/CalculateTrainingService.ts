import {Atom} from '@grammarly/focal';
import {AppModel} from 'src/AppComponent/AppModel';
import {AppEvent} from 'src/_shared/AppEvent';
import {Training, Trainings} from 'src/_shared/models';
import {TrainingFields} from 'src/_shared/types/TrainingFieldsType';

export class CalculateTrainingService {
  state: Atom<AppModel>;
  eventAtom: Atom<AppEvent>;

  constructor(state: Atom<AppModel>, eventAtom: Atom<AppEvent>) {
    this.state = state;
    this.eventAtom = eventAtom;

    this.eventAtom.subscribe(({event, payload}: AppEvent) => {
      switch (event) {
        case CalculateTrainingService.ACTION_CALCULATE_TRAINING_FIELD:
          this.calculateTrainingField(payload as {field: TrainingFields; training: Training});
          break;
      }
    });
  }

  static ACTION_CALCULATE_TRAINING_FIELD: string = 'ACTION_CALCULATE_TRAINING_FIELD';
  private calculateTrainingField({
    field,
    training
  }: {
    field: TrainingFields;
    training: Training;
  }): void {
    let newTraining: Training;
    switch (field) {
      case 'distance':
        newTraining = this.calculateDistance(training);
        break;
      case 'pace':
        newTraining = this.calculatePace(training);
        break;
      case 'time':
        newTraining = this.calculateTime(training);
        break;
    }

    this.state.modify((state: AppModel) => {
      const newState: AppModel = {...state};
      const trainings: Trainings = [...state.trainings];
      const index: number = trainings.findIndex((t: Training) => t.theSame(training));
      trainings[index] = newTraining;
      newState.trainings = trainings;
      newState.activeTraining = newTraining;
      return newState;
    });
  }

  private calculateDistance(training: Training): Training {
    console.log('distance.calculate', training);
    const newTraining: Training = new Training(training);
    // newTraining.time = Math.round(training.distance * training.pace / 1000);
    return newTraining;
  }

  private calculatePace(training: Training): Training {
    console.log('pace.calculate', training);
    const newTraining: Training = new Training(training);
    // newTraining.time = Math.round(training.distance * training.pace / 1000);
    return newTraining;
  }

  private calculateTime(training: Training): Training {
    const newTraining: Training = new Training(training);
    newTraining.time = Math.round((training.distance * training.pace) / 1000);
    return newTraining;
  }
}
