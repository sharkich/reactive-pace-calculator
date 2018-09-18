import {Atom} from '@grammarly/focal';
import {Subject} from 'rxjs/Rx';

import {AppEvent} from '../AppEvent';
import {Training, Trainings} from '../models/index';
import {AppState} from 'src/AppComponent/AppState';
import {FormTrainingService} from 'src/_shared/services/FormTrainingService';
import {CalculateTrainingService} from 'src/_shared/services/CalculateTrainingService';

export class AppService {
  state: Atom<AppState>;
  eventAtom: Atom<AppEvent>;

  private trainingFormService: FormTrainingService;
  private calculateTrainingService: CalculateTrainingService;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(state: Atom<AppState>, eventAtom: Atom<AppEvent>) {
    this.state = state;
    this.eventAtom = eventAtom;
    this.trainingFormService = new FormTrainingService(this.state, this.eventAtom);
    this.calculateTrainingService = new CalculateTrainingService(this.state, this.eventAtom);
  }

  subscribe(): void {
    this.eventAtom.takeUntil(this.destroy$).subscribe(({event, payload}: AppEvent) => {
      switch (event) {
        case AppService.ACTION_ACTIVE_TRAINING_SET:
          this.setActiveTraining(payload as Training);
          break;
        case AppService.ACTION_ACTIVE_TRAINING_RESET:
          this.resetActiveTraining();
          break;
        case AppService.ACTION_ADD_NEW_TRAINING_ON_TOP:
          this.addNewTrainingOnTop();
          break;
        case AppService.ACTION_ADD_NEW_TRAINING_ON_BOTTOM:
          this.addNewTrainingOnBottom();
          break;
        case AppService.ACTION_MODIFY_TRAINING:
          this.modifyTraining(payload as Training);
          break;
      }
    });
    // TODO: Function Variant
    // this.eventAtom
    //   .pipe(
    //     filter(({event}: AppEvent) => event === 'TRAINING_SET_ACTIVE')
    //   )
    //   .subscribe(({payload}: AppEvent) => this.setActiveTraining(payload as Training));
    this.trainingFormService.subscribe();
    this.calculateTrainingService.subscribe();
  }

  unsubscribe(): void {
    this.trainingFormService.unsubscribe();
    this.calculateTrainingService.unsubscribe();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  static ACTION_ACTIVE_TRAINING_SET: string = 'ACTION_ACTIVE_TRAINING_SET';
  private setActiveTraining(training: Training): void {
    const activeTrainingAtom: Atom<Training | null> = this.state.lens('activeTraining');
    activeTrainingAtom.set(training);
  }

  static ACTION_ACTIVE_TRAINING_RESET: string = 'ACTION_ACTIVE_TRAINING_RESET';
  private resetActiveTraining(): void {
    const activeTrainingAtom: Atom<Training | null> = this.state.lens('activeTraining');
    activeTrainingAtom.set(null);
  }

  static ACTION_ADD_NEW_TRAINING_ON_TOP: string = 'ACTION_ADD_NEW_TRAINING_ON_TOP';
  private addNewTrainingOnTop(): void {
    const trainingsAtom: Atom<Trainings> = this.state.lens('trainings');
    trainingsAtom.modify((trainings: Trainings) => [new Training(), ...trainings]);
  }

  static ACTION_ADD_NEW_TRAINING_ON_BOTTOM: string = 'ACTION_ADD_NEW_TRAINING_ON_BOTTOM';
  private addNewTrainingOnBottom(): void {
    const trainingsAtom: Atom<Trainings> = this.state.lens('trainings');
    trainingsAtom.modify((trainings: Trainings) => [...trainings, new Training()]);
  }

  static ACTION_MODIFY_TRAINING: string = 'ACTION_MODIFY_TRAINING';
  private modifyTraining(training: Training): void {
    this.state.modify((state: AppState) => {
      const newState: AppState = {...state};
      const trainings: Trainings = [...state.trainings];
      const index: number = trainings.findIndex((t: Training) => t.theSame(training));
      trainings[index] = training;
      newState.trainings = trainings;
      newState.activeTraining = training;
      return newState;
    });
  }
}
