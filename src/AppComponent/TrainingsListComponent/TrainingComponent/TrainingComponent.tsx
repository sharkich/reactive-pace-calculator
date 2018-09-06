import * as React from 'react';
import {Atom, F} from '@grammarly/focal';
import {Observable} from 'rxjs/Observable';
import {filter, map, merge} from 'rxjs/operators';
// tslint:disable-next-line
import './TrainingComponent.css';

import {Training} from 'src/_shared/models';
import {AppEvent} from 'src/_shared/AppEvent';
import {AppService} from 'src/_shared/AppService';
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
          <h2 className="training__title">{this.training.name}</h2>
        </div>

        <div className="training__data">
          <div className="training__data__single">
            Distance: <mark>{this.training.distance}</mark>
            <span className="training__data__additional">km,</span>
          </div>
          <div className="training__data__single">
            Pace: <mark>{this.training.pace}</mark>
            <span className="training__data__additional">min/km</span>,
          </div>
          <div className="training__data__single">
            Time: <mark>{this.training.time}</mark>
          </div>
        </div>

        <TrainingFormComponent
          // @ts-ignore
          training={this.training}
          activeTraining={this.activeTraining}
          eventAtom={this.eventAtom}
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
}
