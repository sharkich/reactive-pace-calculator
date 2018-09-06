import {Atom} from '@grammarly/focal';
import {Training, Trainings} from './models';
import {AppEvent} from './AppEvent';
import {AppModel} from '../AppComponent/AppModel';

export class AppService {
  state: Atom<AppModel>;
  eventAtom: Atom<AppEvent>;

  constructor(state: Atom<AppModel>, eventAtom: Atom<AppEvent>) {
    this.state = state;
    this.eventAtom = eventAtom;

    this.eventAtom.subscribe(({event, payload}: AppEvent) => {
      console.log(event, payload);
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
        case AppService.ACTION_ACTIVE_TRAINING_SET_NAME:
          this.setActiveTrainingName(payload as string);
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

  static ACTION_ACTIVE_TRAINING_SET_NAME: string = 'ACTION_ACTIVE_TRAINING_SET_NAME';
  private setActiveTrainingName(newName: string): void {
    // this.trainingsAtom.lens(Lens.key(index))
    // const activeTrainingAtom: Atom<Training | null> = this.state.lens('activeTraining');
    this.state.modify((state: AppModel) => {
      const newState: AppModel = {...state};

      let activeTraining: Training = {...newState.activeTraining} as Training;
      activeTraining = new Training(newState.activeTraining);
      activeTraining.name = newName;
      newState.activeTraining = activeTraining;

      const trainings: Trainings = [...state.trainings];
      const index: number = trainings.findIndex((training: Training) =>
        training.theSame(activeTraining)
      );
      trainings[index] = newState.activeTraining;
      newState.trainings = trainings;

      return newState;
    });
  }
}
