import {Atom} from '@grammarly/focal';
import {AppModel} from 'src/AppComponent/AppModel';
import {AppEvent} from 'src/_shared/AppEvent';
import {Training, Trainings} from 'src/_shared/models';
import {TrainingFields} from 'src/_shared/types/TrainingFieldsType';
import {filter} from 'rxjs/operators';

export class CalculateTrainingService {
  state: Atom<AppModel>;
  eventAtom: Atom<AppEvent>;

  constructor(state: Atom<AppModel>, eventAtom: Atom<AppEvent>) {
    this.state = state;
    this.eventAtom = eventAtom;

    this.eventAtom
      .pipe(
        filter(
          ({event}: AppEvent) => event === CalculateTrainingService.ACTION_CALCULATE_TRAINING_FIELD
        )
      )
      .subscribe(({payload}: AppEvent) =>
        this.calculateTrainingField(payload as {field: TrainingFields; training: Training})
      );
  }

  static ACTION_CALCULATE_TRAINING_FIELD: string = 'ACTION_CALCULATE_TRAINING_FIELD';
  private calculateTrainingField({
    field,
    training
  }: {
    field: TrainingFields;
    training: Training;
  }): void {
    const newTraining: Training | null = this.getTrainModifyFn(field)(training);
    if (!newTraining) {
      return;
    }
    newTraining.valid = true;
    this.state.modify((state: AppModel) => {
      const newState: AppModel = {...state};
      const trainings: Trainings = [...state.trainings];
      const index: number = trainings.findIndex((t: Training) => t.theSame(training));
      trainings[index] = newTraining as Training;
      newState.trainings = trainings;
      newState.activeTraining = newTraining;
      return newState;
    });
  }

  private getTrainModifyFn(field: string): (taining: Training) => Training | null {
    switch (field) {
      case 'distance':
        return this.calculateDistance;
      case 'pace':
        return this.calculatePace;
      case 'time':
        return this.calculateTime;
      default:
        return () => null;
    }
  }

  private calculateDistance(training: Training): Training {
    const newTraining: Training = new Training(training);
    newTraining.distance = Math.round((training.time * 1000) / training.pace);
    return newTraining;
  }

  private calculatePace(training: Training): Training {
    const newTraining: Training = new Training(training);
    newTraining.pace = Math.round((training.time * 1000) / training.distance);
    return newTraining;
  }

  private calculateTime(training: Training): Training {
    const newTraining: Training = new Training(training);
    newTraining.time = Math.round((training.distance * training.pace) / 1000);
    return newTraining;
  }
}
