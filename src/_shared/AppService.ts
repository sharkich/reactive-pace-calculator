import {Atom} from '@grammarly/focal';

import {Training} from './models';
import {AppEvent} from './AppEvent';
import {AppModel} from '../AppComponent/AppModel';

export class AppService {

  state: Atom<AppModel>;
  eventAtom: Atom<AppEvent>;

  constructor(state: Atom<AppModel>, eventAtom: Atom<AppEvent>) {
    this.state = state;
    this.eventAtom = eventAtom;

    this.eventAtom
      .subscribe(({event, payload}: AppEvent) => {
        console.log('event', event, payload);
        switch (event) {
          case AppService.ACTION_ACTIVE_TRAINING_SET:
            this.setActiveTraining(payload as Training);
            break;
          case AppService.ACTION_ACTIVE_TRAINING_RESET:
            this.resetActiveTraining();
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
    activeTrainingAtom.set(training);
  }

  static ACTION_ACTIVE_TRAINING_RESET: string = 'ACTION_ACTIVE_TRAINING_RESET';
  private resetActiveTraining(): void {
    const activeTrainingAtom: Atom<Training | null> = this.state.lens('activeTraining');
    activeTrainingAtom.set(null);
  }

}
