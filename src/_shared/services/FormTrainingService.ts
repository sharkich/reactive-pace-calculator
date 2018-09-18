import {Atom} from '@grammarly/focal';
import {Subject} from 'rxjs/Rx';
import * as R from 'ramda';

import {DistanceRevertPipe} from 'src/_shared/pipes/distance.pipe';
import {TimeRevertPipe} from 'src/_shared/pipes/time.pipe';
import {Training, Trainings} from 'src/_shared/models';
import {AppModel} from 'src/AppComponent/AppModel';
import {AppEvent} from 'src/_shared/AppEvent';
import {CalculateTrainingService} from 'src/_shared/services/CalculateTrainingService';
import {AppService} from 'src/_shared/services/AppService';

export class FormTrainingService {
  state: Atom<AppModel>;
  eventAtom: Atom<AppEvent>;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(state: Atom<AppModel>, eventAtom: Atom<AppEvent>) {
    this.state = state;
    this.eventAtom = eventAtom;
  }

  subscribe(): void {
    this.eventAtom.takeUntil(this.destroy$).subscribe(({event, payload}: AppEvent) => {
      switch (event) {
        case FormTrainingService.ACTION_ACTIVE_TRAINING_SET_NAME:
          this.setActiveTrainingName(payload as {value: string; training: Training});
          break;
        case FormTrainingService.ACTION_ACTIVE_TRAINING_SET_DISTANCE:
          this.setActiveTrainingDistance(payload as {value: string; training: Training});
          break;
        case FormTrainingService.ACTION_ACTIVE_TRAINING_SET_PACE:
          this.setActiveTrainingPace(payload as {value: string; training: Training});
          break;
        case FormTrainingService.ACTION_ACTIVE_TRAINING_SET_TIME:
          this.setActiveTrainingTime(payload as {value: string; training: Training});
          break;
      }
    });
  }

  unsubscribe(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  static ACTION_ACTIVE_TRAINING_SET_NAME: string = 'ACTION_ACTIVE_TRAINING_SET_NAME';
  setActiveTrainingName({value, training}: {value: string; training: Training}): void {
    this.changeActiveTrainingProperty(value, training)('name');
  }

  static ACTION_ACTIVE_TRAINING_SET_DISTANCE: string = 'ACTION_ACTIVE_TRAINING_SET_DISTANCE';
  setActiveTrainingDistance({value, training}: {value: string; training: Training}): void {
    const distance: number = DistanceRevertPipe(value);
    this.changeActiveTrainingProperty(distance, training)('distance');
  }

  static ACTION_ACTIVE_TRAINING_SET_PACE: string = 'ACTION_ACTIVE_TRAINING_SET_PACE';
  setActiveTrainingPace({value, training}: {value: string; training: Training}): void {
    const pace: number = TimeRevertPipe(value);
    this.changeActiveTrainingProperty(pace, training)('pace');
  }

  static ACTION_ACTIVE_TRAINING_SET_TIME: string = 'ACTION_ACTIVE_TRAINING_SET_TIME';
  setActiveTrainingTime({value, training}: {value: string; training: Training}): void {
    const time: number = TimeRevertPipe(value);
    this.changeActiveTrainingProperty(time, training)('time');
  }

  private changeActiveTrainingProperty(
    value: any,
    training: Training
  ): (field: keyof Training) => void {
    return (field: keyof Training): void => {
      this.eventAtom.set(new AppEvent(AppService.ACTION_MODIFY_TRAINING, training));
      this.state.modify((state: AppModel) => {
        const newState: AppModel = {...state};

        let activeTraining: Training = {...newState.activeTraining} as Training;
        activeTraining = new Training(newState.activeTraining);

        activeTraining[field] = value;
        R.pipe(
          R.when(
            (fields: string[]) => fields.indexOf(field) === -1,
            () => (activeTraining.valid = CalculateTrainingService.isValidTraining(activeTraining))
          )
        )(['distance', 'pace', 'time']);

        newState.activeTraining = activeTraining;

        const trainings: Trainings = [...state.trainings];
        const index: number = trainings.findIndex((t: Training) => t.theSame(activeTraining));
        trainings[index] = newState.activeTraining;
        newState.trainings = trainings;

        return newState;
      });
      // TODO: Put data to DB
    };
  }
}
