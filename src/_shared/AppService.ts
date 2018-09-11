import {Atom} from '@grammarly/focal';

import {AppEvent} from './AppEvent';
import {Training, Trainings} from './models';
import {AppModel} from '../AppComponent/AppModel';
import {TrainingFormService} from 'src/_shared/TrainingFormService';

export class AppService {
  state: Atom<AppModel>;
  eventAtom: Atom<AppEvent>;

  trainingFormService: TrainingFormService;

  constructor(state: Atom<AppModel>, eventAtom: Atom<AppEvent>) {
    this.state = state;
    this.eventAtom = eventAtom;

    this.trainingFormService = new TrainingFormService(this.state, this.eventAtom);

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
        case AppService.ACTION_CALCULATE_TRAINING_FIELD:
          console.log('ACTION_CALCULATE_TRAINING_FIELD', payload);
          this.calculateTrainingField(payload as {field: string; training: Training});
          break;
      }
    });
    // this.eventAtom
    //   .pipe(
    //     filter(({event}: AppEvent) => event === 'TRAINING_SET_ACTIVE')
    //   )
    //   .subscribe(({payload}: AppEvent) => this.setActiveTraining(payload as Training));
  }

  static ACTION_ACTIVE_TRAINING_SET: string = 'ACTION_ACTIVE_TRAINING_SET';
  private setActiveTraining(training: Training): void {
    const activeTrainingAtom: Atom<Training | null> = this.state.lens('activeTraining');
    activeTrainingAtom.modify((currentActiveTraining: Training) => {
      let newTraining: Training = currentActiveTraining;
      if (currentActiveTraining.id !== training.id) {
        newTraining = training;
      }
      return newTraining;
    });
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

  static ACTION_CALCULATE_TRAINING_FIELD: string = 'ACTION_CALCULATE_TRAINING_FIELD';
  private calculateTrainingField(payload: {field: string; training: Training}): void {
    console.log('calculateTrainingField', payload);
  }
}
