import * as React from 'react';
import {Atom, F} from '@grammarly/focal';
import {Observable} from 'rxjs/Observable';
import {filter, map, merge} from 'rxjs/operators';
// tslint:disable-next-line
import './TrainingComponent.css';

import {Training} from 'src/_shared/models';
import {AppEvent} from 'src/_shared/AppEvent';
import {TimePipe} from 'src/_shared/pipes/time.pipe';
import {AppService} from 'src/_shared/services/AppService';
import {DistancePipe} from 'src/_shared/pipes/distance.pipe';
import {TrainingFormComponent} from './TrainingFormComponent/TrainingFormComponent';

export interface Props {
  trainingAtom: Atom<Training | null>;
  activeTrainingAtom: Atom<Training | null>;
  eventAtom: Atom<AppEvent>;
}

export class TrainingComponent extends React.Component<Props> {
  eventAtom: Atom<AppEvent>;

  trainingAtom: Atom<Training | null>;
  activeTrainingAtom: Atom<Training | null>;

  training: Training;
  activeTraining: Training | null;

  constructor(data: any) {
    super(data);

    this.onClick = this.onClick.bind(this);
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
        return this.view(this.training.theSame(this.activeTraining));
      })
    );

    const emptyObservable: Observable<JSX.Element> = dataObservable.pipe(
      filter(this.isEmptyObservableData.bind(this)),
      map(([training]: Training[]) => this.emptyView(training))
    );

    return <F.div>{existObservable.pipe(merge(emptyObservable))}</F.div>;
  }

  private view(isActive: boolean): JSX.Element {
    const activeClassName: string = this.isActiveTraining() ? 'training--active' : '';
    return (
      <F.div onClick={this.onClick} className={'training card ' + activeClassName}>
        <div className="training__header">
          <h2 className="training__title">
            <label htmlFor={`field-name-${this.training.id}`}>{this.training.name}</label>
          </h2>
        </div>

        <div className="training__data">
          <div className="training__data__single">
            <label htmlFor={`field-distance-${this.training.id}`}>
              Distance: <mark>{DistancePipe(this.training.distance)}</mark>
              <span className="training__data__additional">km,</span>
            </label>
          </div>
          <div className="training__data__single">
            <label htmlFor={`field-pace-${this.training.id}`}>
              Pace: <mark>{TimePipe(this.training.pace)}</mark>
              <span className="training__data__additional">min/km</span>,
            </label>
          </div>
          <div className="training__data__single">
            <label htmlFor={`field-time-${this.training.id}`}>
              Time: <mark>{TimePipe(this.training.time)}</mark>
            </label>
          </div>
        </div>

        {this.formView(isActive)}
      </F.div>
    );
  }

  private formView(isActive: boolean): JSX.Element {
    if (!isActive) {
      return <div />;
    }
    return (
      <TrainingFormComponent
        // @ts-ignore
        trainingAtom={this.trainingAtom}
        eventAtom={this.eventAtom}
      />
    );
  }

  private emptyView(training: Training): JSX.Element {
    return <div key={`additional-${training && training.id}`}>Loading...</div>;
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
    let newActiveTraining: Training | null = null;
    if (!this.isActiveTraining()) {
      newActiveTraining = this.training;
    }
    this.eventAtom.set(new AppEvent(AppService.ACTION_ACTIVE_TRAINING_SET, newActiveTraining));
  }
}
