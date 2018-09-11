import {DistanceRevertPipe} from 'src/_shared/pipes/distance.pipe';
import {TimeRevertPipe} from 'src/_shared/pipes/time.pipe';
import {Training, Trainings} from 'src/_shared/models';
import {AppModel} from 'src/AppComponent/AppModel';
import {Atom} from '@grammarly/focal';
import {AppEvent} from 'src/_shared/AppEvent';

export class FormTrainingService {

  state: Atom<AppModel>;
  eventAtom: Atom<AppEvent>;

  constructor(state: Atom<AppModel>, eventAtom: Atom<AppEvent>) {
    this.state = state;
    this.eventAtom = eventAtom;

    this.eventAtom.subscribe(({event, payload}: AppEvent) => {
      switch (event) {
        case FormTrainingService.ACTION_ACTIVE_TRAINING_SET_NAME:
          console.log('ACTION_ACTIVE_TRAINING_SET_NAME', payload);
          this.setActiveTrainingName(payload as string);
          break;
        case FormTrainingService.ACTION_ACTIVE_TRAINING_SET_DISTANCE:
          console.log('ACTION_ACTIVE_TRAINING_SET_DISTANCE', payload);
          this.setActiveTrainingDistance(payload as string);
          break;
        case FormTrainingService.ACTION_ACTIVE_TRAINING_SET_PACE:
          console.log('ACTION_ACTIVE_TRAINING_SET_PACE', payload);
          this.setActiveTrainingPace(payload as string);
          break;
        case FormTrainingService.ACTION_ACTIVE_TRAINING_SET_TIME:
          console.log('ACTION_ACTIVE_TRAINING_SET_TIME', payload);
          this.setActiveTrainingTime(payload as string);
          break;
      }
    });
  }

  static ACTION_ACTIVE_TRAINING_SET_NAME: string = 'ACTION_ACTIVE_TRAINING_SET_NAME';
  setActiveTrainingName(newName: string): void {
    const name: string = this.clearText(newName) || '(noname)';
    this.changeActiveTrainingProperty('name', name);
  }

  static ACTION_ACTIVE_TRAINING_SET_DISTANCE: string = 'ACTION_ACTIVE_TRAINING_SET_DISTANCE';
  setActiveTrainingDistance(newDistance: string): void {
    const distance: number = DistanceRevertPipe(this.clearText(newDistance) || '0') || 0;
    this.changeActiveTrainingProperty('distance', distance);
  }

  static ACTION_ACTIVE_TRAINING_SET_PACE: string = 'ACTION_ACTIVE_TRAINING_SET_PACE';
  setActiveTrainingPace(newPace: string): void {
    const pace: number = TimeRevertPipe(this.clearText(newPace) || '0') || 0;
    this.changeActiveTrainingProperty('pace', pace);
  }

  static ACTION_ACTIVE_TRAINING_SET_TIME: string = 'ACTION_ACTIVE_TRAINING_SET_TIME';
  setActiveTrainingTime(newTime: string): void {
    const time: number = TimeRevertPipe(this.clearText(newTime) || '0') || 0;
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
