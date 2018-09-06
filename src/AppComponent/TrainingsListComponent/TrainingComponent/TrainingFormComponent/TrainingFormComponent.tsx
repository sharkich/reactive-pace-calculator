import * as React from 'react';
import {Atom} from '@grammarly/focal';
// tslint:disable-next-line
import './TrainingFormComponent.css';

import {Training} from 'src/_shared/models';
import {AppEvent} from 'src/_shared/AppEvent';
import {AppService} from 'src/_shared/AppService';

export interface Props {
  training: Training;
  activeTraining: Training | null;
  eventAtom: Atom<AppEvent>;
}

export class TrainingFormComponent extends React.Component<Props> {

  eventAtom: Atom<AppEvent>;

  constructor(data: any) {
    super(data);

    this.onTitleKeyUp = this.onTitleKeyUp.bind(this);
    this.onDistanceKeyUp = this.onDistanceKeyUp.bind(this);
    this.onPaceKeyUp = this.onPaceKeyUp.bind(this);
    this.onTimeKeyUp = this.onTimeKeyUp.bind(this);
  }

  render(): JSX.Element {
    const props: Props = this.props as Props;

    this.eventAtom = props.eventAtom;

    const training: Training = props.training;
    const activeTraining: Training | null = props.activeTraining;

    if (training && training.theSame(activeTraining)) {
      return this.view(training);
    }

    return this.emptyView(training);
  }

  private view(training: Training): JSX.Element {
    return (
      <div
        key={`additional-${training.id}`}
        className="training-form"
      >

        <form className="form">
          <div className="row">
            <div className="col-1">
              <label htmlFor={`field-name-${training.id}`}>Training name:</label>
            </div>
            <div className="col--2">
              <input
                type="text"
                id={`field-name-${training.id}`}
                defaultValue={training.name}
                onKeyUp={this.onTitleKeyUp}
              />
            </div>
          </div>
        </form>

        <div className="training__additional">
          <div className="training__data__single">
            Name: <span className="mark">{training.name}</span>{' '},
            Distance: <span className="mark">{training.distance}</span>{' '},
            Pace: <span className="mark">{training.pace}</span>{' '},
            Time: <span className="mark">{training.time}</span>{' '},

            Speed:{' '}
            <span className="mark">x</span>{' '}
            <span className="training__data__additional">km/h</span>,
          </div>
          <div>
            <span className="grey"> ID: {training.id}</span>
          </div>
        </div>
      </div>
    );
  }

  private emptyView(training: Training): JSX.Element {
    return <div key={`additional-${training.id}`} />;
  }

  private onTitleKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (!this.isValidStringKey(event.key)) {
      event.stopPropagation();
      return;
    }
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.eventAtom.set(new AppEvent(AppService.ACTION_ACTIVE_TRAINING_SET_NAME, inputElement.value));
  }

  private onDistanceKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (!this.isValidNumberKey(event.key)) {
      event.stopPropagation();
      return;
    }
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.eventAtom.set(
      new AppEvent(AppService.ACTION_ACTIVE_TRAINING_SET_DISTANCE, inputElement.value)
    );
  }

  private onPaceKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (!this.isValidNumberKey(event.key)) {
      event.stopPropagation();
      return;
    }
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.eventAtom.set(
      new AppEvent(AppService.ACTION_ACTIVE_TRAINING_SET_PACE, inputElement.value)
    );
  }

  private onTimeKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (!this.isValidNumberKey(event.key)) {
      event.stopPropagation();
      return;
    }
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.eventAtom.set(
      new AppEvent(AppService.ACTION_ACTIVE_TRAINING_SET_TIME, inputElement.value)
    );
  }

  private isValidNumberKey(key: string): boolean {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(+key) !== -1;
  }

  private isValidStringKey(key: string): boolean {
    return ['Enter', 'Escape'].indexOf(key) === -1;
  }
}
