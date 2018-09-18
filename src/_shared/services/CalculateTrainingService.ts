import {Atom} from '@grammarly/focal';
import {Subject} from 'rxjs/Rx';

import {AppModel} from 'src/AppComponent/AppModel';
import {AppEvent} from 'src/_shared/AppEvent';
import {Training} from 'src/_shared/models';
import {TrainingFields} from 'src/_shared/types/TrainingFieldsType';
import {filter} from 'rxjs/operators';
import {AppService} from 'src/_shared/services/AppService';

export class CalculateTrainingService {
  state: Atom<AppModel>;
  eventAtom: Atom<AppEvent>;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(state: Atom<AppModel>, eventAtom: Atom<AppEvent>) {
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
    const newTraining: Training = CalculateTrainingService.getTrainModifyFn(field)(training);
    newTraining.valid = true;
    this.eventAtom.set(new AppEvent(AppService.ACTION_MODIFY_TRAINING, newTraining));
  }
  static isCalculateTrainingFieldEvent({event}: AppEvent): boolean {
    return event === CalculateTrainingService.ACTION_CALCULATE_TRAINING_FIELD;
  }

  static getTrainModifyFn(field: string): (training: Training) => Training {
    switch (field) {
      case 'distance':
        return CalculateTrainingService.calculateDistance;
      case 'pace':
        return CalculateTrainingService.calculatePace;
      case 'time':
        return CalculateTrainingService.calculateTime;
      default:
        return (training: Training) => training;
    }
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
