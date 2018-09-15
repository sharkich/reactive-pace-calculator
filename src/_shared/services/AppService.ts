import {Atom} from '@grammarly/focal';

import {AppEvent} from '../AppEvent';
import {Training, Trainings} from '../models/index';
import {AppModel} from '../../AppComponent/AppModel';
import {FormTrainingService} from 'src/_shared/services/FormTrainingService';
import {CalculateTrainingService} from 'src/_shared/services/CalculateTrainingService';

export class AppService {
  state: Atom<AppModel>;
  eventAtom: Atom<AppEvent>;

  trainingFormService: FormTrainingService;
  calculateTrainingService: CalculateTrainingService;

  constructor(state: Atom<AppModel>, eventAtom: Atom<AppEvent>) {
    this.state = state;
    this.eventAtom = eventAtom;

    this.eventAtom.subscribe(({event, payload}: AppEvent) => {
      switch (event) {
        case AppService.ACTION_ACTIVE_TRAINING_SET:
          console.log('ACTION_ACTIVE_TRAINING_SET', payload);
          this.setActiveTraining(payload as Training);
          break;
        case AppService.ACTION_ACTIVE_TRAINING_RESET:
          console.log('ACTION_ACTIVE_TRAINING_RESET', payload);
          this.resetActiveTraining();
          break;
        case AppService.ACTION_ADD_NEW_TRAINING_ON_TOP:
          console.log('ACTION_ADD_NEW_TRAINING_ON_TOP', payload);
          this.addNewTrainingOnTop();
          break;
        case AppService.ACTION_ADD_NEW_TRAINING_ON_BOTTOM:
          console.log('ACTION_ADD_NEW_TRAINING_ON_BOTTOM', payload);
          this.addNewTrainingOnBottom();
          break;
      }
    });

    this.trainingFormService = new FormTrainingService(this.state, this.eventAtom);
    this.calculateTrainingService = new CalculateTrainingService(this.state, this.eventAtom);

    // TODO: Function Variant
    // this.eventAtom
    //   .pipe(
    //     filter(({event}: AppEvent) => event === 'TRAINING_SET_ACTIVE')
    //   )
    //   .subscribe(({payload}: AppEvent) => this.setActiveTraining(payload as Training));
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
    trainingsAtom.modify((originTrainings: Trainings) => {
      const newTrainings: Trainings = [...originTrainings];
      newTrainings.unshift(new Training());
      return newTrainings;
    });
  }

  static ACTION_ADD_NEW_TRAINING_ON_BOTTOM: string = 'ACTION_ADD_NEW_TRAINING_ON_BOTTOM';
  private addNewTrainingOnBottom(): void {
    const trainingsAtom: Atom<Trainings> = this.state.lens('trainings');
    trainingsAtom.modify((originTrainings: Trainings) => {
      const newTrainings: Trainings = [...originTrainings];
      newTrainings.push(new Training());
      return newTrainings;
    });
  }
}
