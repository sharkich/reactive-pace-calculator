import {Atom} from '@grammarly/focal';
import {Subject} from 'rxjs/Rx';

import {AppState} from 'src/AppComponent/AppState';
import {AppEvent} from 'src/_shared/AppEvent';
import {Training} from 'src/_shared/models';
import {TrainingFields} from 'src/_shared/types/TrainingFieldsType';
import {filter} from 'rxjs/operators';
import {AppService} from 'src/_shared/services/AppService';

export class CalculateTrainingService {
  state: Atom<AppState>;
  eventAtom: Atom<AppEvent>;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(state: Atom<AppState>, eventAtom: Atom<AppEvent>) {
    this.state = state;
    this.eventAtom = eventAtom;
  }

  subscribe(): void {
    this.eventAtom
      .pipe(
        filter(
          ({event}: AppEvent) => event === CalculateTrainingService.ACTION_CALCULATE_TRAINING_FIELD
        )
      )
      .takeUntil(this.destroy$)
      .subscribe(({payload}: AppEvent) =>
        this.calculateTrainingField(payload as {field: TrainingFields; training: Training})
      );
  }

  unsubscribe(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  static ACTION_CALCULATE_TRAINING_FIELD: string = 'ACTION_CALCULATE_TRAINING_FIELD';
  private calculateTrainingField({
    field,
    training
  }: {
    field: TrainingFields;
    training: Training;
  }): void {
    const newTraining: Training = CalculateTrainingService.getTrainModifyFn(training)(field);
    newTraining.valid = true;
    this.eventAtom.set(new AppEvent(AppService.ACTION_MODIFY_TRAINING, newTraining));
    // TODO: Put data to DB
  }
  static isCalculateTrainingFieldEvent({event}: AppEvent): boolean {
    return event === CalculateTrainingService.ACTION_CALCULATE_TRAINING_FIELD;
  }

  static getTrainModifyFn(training: Training): (field: string) => Training {
    return (field: string): Training => {
      switch (field) {
        case 'distance':
          return CalculateTrainingService.calculateDistance(training);
        case 'pace':
          return CalculateTrainingService.calculatePace(training);
        case 'time':
          return CalculateTrainingService.calculateTime(training);
        default:
          return training;
      }
    };
  }

  static calculateDistance(training: Training): Training {
    const newTraining: Training = new Training(training);
    newTraining.distance = Math.round((training.time * 1000) / training.pace);
    return newTraining;
  }

  static calculatePace(training: Training): Training {
    const newTraining: Training = new Training(training);
    newTraining.pace = Math.round((training.time * 1000) / training.distance);
    return newTraining;
  }

  static calculateTime(training: Training): Training {
    const newTraining: Training = new Training(training);
    newTraining.time = Math.round((training.distance * training.pace) / 1000);
    return newTraining;
  }

  static isValidTraining(training: Training): boolean {
    return Math.abs(training.distance - Math.round((training.time * 1000) / training.pace)) <= 5;
  }
}
