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
        case AppService.ACTION_ACTIVE_TRAINING_SET_DISTANCE:
          this.setActiveTrainingDistance(payload as string);
          break;
        case AppService.ACTION_ACTIVE_TRAINING_SET_PACE:
          this.setActiveTrainingPace(payload as string);
          break;
        case AppService.ACTION_ACTIVE_TRAINING_SET_TIME:
          this.setActiveTrainingTime(payload as string);
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
    const name: string = this.clearText(newName) || '(noname)';
    this.changeActiveTrainingProperty('name', name);
  }

  static ACTION_ACTIVE_TRAINING_SET_DISTANCE: string = 'ACTION_ACTIVE_TRAINING_SET_DISTANCE';
  private setActiveTrainingDistance(newDistance: string): void {
    const distance: number = +(this.clearText(newDistance) || '0') || 0;
    this.changeActiveTrainingProperty('distance', distance);
  }

  static ACTION_ACTIVE_TRAINING_SET_PACE: string = 'ACTION_ACTIVE_TRAINING_SET_PACE';
  private setActiveTrainingPace(newPace: string): void {
    const pace: number = +(this.clearText(newPace) || '0') || 0;
    this.changeActiveTrainingProperty('pace', pace);
  }

  static ACTION_ACTIVE_TRAINING_SET_TIME: string = 'ACTION_ACTIVE_TRAINING_SET_TIME';
  private setActiveTrainingTime(newTime: string): void {
    const time: number = +(this.clearText(newTime) || '0') || 0;
    this.changeActiveTrainingProperty('time', time);
  }

  private clearText(inputValue: string): string {
    const div: HTMLDivElement = document.createElement('div');
    div.innerHTML = inputValue;
    const text: string = div.textContent || div.innerText || '';
    return text.trim();
  }

  private changeActiveTrainingProperty(propertyName: keyof Training, value: any): void {
    this.state.modify((state: AppModel) => {
      const newState: AppModel = {...state};

      let activeTraining: Training = {...newState.activeTraining} as Training;
      activeTraining = new Training(newState.activeTraining);

      activeTraining[propertyName] = value;

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
