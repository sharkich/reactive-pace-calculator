import {Atom} from '@grammarly/focal';
import {AppModel} from 'src/AppComponent/AppModel';
import {AppEvent} from 'src/_shared/AppEvent';
import {Training} from 'src/_shared/models';
import {TrainingFields} from 'src/_shared/types/TrainingFieldsType';

export class CalculateTrainingService {
  state: Atom<AppModel>;
  eventAtom: Atom<AppEvent>;

  constructor(state: Atom<AppModel>, eventAtom: Atom<AppEvent>) {
    this.state = state;
    this.eventAtom = eventAtom;

    this.eventAtom.subscribe(({event, payload}: AppEvent) => {
      switch (event) {
        case CalculateTrainingService.ACTION_CALCULATE_TRAINING_FIELD:
          console.log('ACTION_CALCULATE_TRAINING_FIELD', payload);
          this.calculateTrainingField(payload as {field: TrainingFields; training: Training});
          break;
      }
    });
  }

  static ACTION_CALCULATE_TRAINING_FIELD: string = 'ACTION_CALCULATE_TRAINING_FIELD';
  private calculateTrainingField({field, training}: {field: TrainingFields; training: Training}): void {
    switch (field) {
      case 'distance':
        this.calculateDistance(training);
        break;
      case 'pace':
        this.calculatePace(training);
        break;
      case 'time':
        this.calculateTime(training);
        break;
    }
  }

  private calculateDistance(training: Training): void {
    console.log('distance.calculate', training);
  }

  private calculatePace(training: Training): void {
    console.log('pace.calculate', training);
  }

  private calculateTime(training: Training): void {
    console.log('time.calculate', training);
  }

}
