import * as React from 'react';
import {Atom, F} from '@grammarly/focal';
import {Observable} from 'rxjs/Observable';
import {filter, map, merge} from 'rxjs/operators';
// tslint:disable-next-line
import './TrainingComponent.css';

import {Training} from '../_shared/models';
import {AppEvent} from '../_shared/AppEvent';
import {AppService} from '../_shared/AppService';
import {TrainingFooterComponent} from '../TrainingFooterComponent/TrainingFooterComponent';

export interface Props {
  trainingAtom: Atom<Training | null>;
  activeTrainingAtom: Atom<Training | null>;
  eventAtom: Atom<AppEvent>;
}

export class TrainingComponent extends React.Component {
  eventAtom: Atom<AppEvent>;

  trainingAtom: Atom<Training | null>;
  activeTrainingAtom: Atom<Training | null>;

  training: Training;
  activeTraining: Training | null;

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

    this.trainingAtom = props.trainingAtom;
    this.activeTrainingAtom = props.activeTrainingAtom;

    const dataObservable: Observable<Array<Training | null>> = Observable.combineLatest(
      this.trainingAtom,
      this.activeTrainingAtom
    );

    const existObservable: Observable<JSX.Element> = dataObservable.pipe(
      filter(this.isExistObservableData),
      map(([training, activeTraining]: Array<Training | null>) => {
        this.training = training as Training;
        this.activeTraining = activeTraining;
        return this.view();
      })
    );

    const emptyObservable: Observable<JSX.Element> = dataObservable.pipe(
      filter(this.isEmptyObservableData.bind(this)),
      map(([training]: Training[]) => this.emptyView(training))
    );

    return <F.div>{existObservable.pipe(merge(emptyObservable))}</F.div>;
  }

  private view(): JSX.Element {
    const activeClassName: string = this.isActiveTraining() ? 'training--active' : '';
    return (
      <F.div onClick={() => this.onClick()} className={'training card ' + activeClassName}>
        <div className="training__header">
          <h2
            dangerouslySetInnerHTML={{__html: this.training.name}}
            contentEditable={true}
            onKeyUp={this.onTitleKeyUp}
            className="training__title"
          />
        </div>

        <div className="training__data">
          <div className="training__data__single">
            Distance:{' '}
            <span
              dangerouslySetInnerHTML={{__html: '' + this.training.distance}}
              contentEditable={true}
              onKeyUp={this.onDistanceKeyUp}
            />
            <span className="training__data__additional">km,</span>
          </div>
          <div className="training__data__single">
            Pace:{' '}
            <span
              dangerouslySetInnerHTML={{__html: '' + this.training.pace}}
              contentEditable={true}
              onKeyUp={this.onPaceKeyUp}
            />
            <span className="training__data__additional">min/km</span>,
          </div>
          <div className="training__data__single">
            Time:{' '}
            <span
              dangerouslySetInnerHTML={{__html: '' + this.training.time}}
              contentEditable={true}
              onKeyUp={this.onTimeKeyUp}
            />
          </div>
        </div>

        <TrainingFooterComponent
          // @ts-ignore
          training={this.training}
          activeTraining={this.activeTraining}
        />
      </F.div>
    );
  }

  private emptyView(training: Training): JSX.Element {
    const key: string = `additional-${training && training.id}`;
    return <div key={key}>Loading...</div>;
  }

  private isExistObservableData([training]: Array<Training | null>): boolean {
    return !!training;
  }

  private isEmptyObservableData([training, activeTraining]: Array<Training | null>): boolean {
    return !this.isExistObservableData([training, activeTraining]);
  }

  private isActiveTraining(): boolean {
    return !!this.training && this.training.theSame(this.activeTraining);
  }

  private onClick(): void {
    if (this.isActiveTraining()) {
      return;
    }
    this.eventAtom.set(new AppEvent(AppService.ACTION_ACTIVE_TRAINING_SET, this.training));
  }

  private onTitleKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (!this.isValidStringKey(event.key)) {
      event.stopPropagation();
      return;
    }
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.eventAtom.set(new AppEvent(AppService.ACTION_ACTIVE_TRAINING_SET_NAME, inputElement.innerText));
  }

  private onDistanceKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (!this.isValidNumberKey(event.key)) {
      event.stopPropagation();
      return;
    }
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.eventAtom.set(
      new AppEvent(AppService.ACTION_ACTIVE_TRAINING_SET_DISTANCE, inputElement.innerText)
    );
  }

  private onPaceKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (!this.isValidNumberKey(event.key)) {
      event.stopPropagation();
      return;
    }
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.eventAtom.set(
      new AppEvent(AppService.ACTION_ACTIVE_TRAINING_SET_PACE, inputElement.innerText)
    );
  }

  private onTimeKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (!this.isValidNumberKey(event.key)) {
      event.stopPropagation();
      return;
    }
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.eventAtom.set(
      new AppEvent(AppService.ACTION_ACTIVE_TRAINING_SET_TIME, inputElement.innerText)
    );
  }

  private isValidNumberKey(key: string): boolean {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(+key) !== -1;
  }

  private isValidStringKey(key: string): boolean {
    return ['Enter', 'Escape'].indexOf(key) === -1;
  }
}
