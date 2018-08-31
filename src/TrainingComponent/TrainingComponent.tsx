import * as React from 'react';
import {Atom, F} from '@grammarly/focal'; // classes
import {Observable} from 'rxjs/Observable';
import {filter, map, merge} from 'rxjs/operators';

// tslint:disable-next-line
import './TrainingComponent.css';

import {Training} from '../_shared/models';
import {AppEvent} from '../_shared/AppEvent';
import {AppService} from '../_shared/AppService';
import {TrainingFooterComponent} from '../TrainingFooterComponent/TrainingFooterComponent';

export interface Props {
  training: Atom<Training | null>;
  activeTraining: Atom<Training | null>;
  event: Atom<AppEvent>;
}

export class TrainingComponent extends React.Component {

  training: Training;
  activeTraining: Training | null;
  event: Atom<AppEvent>;

  render(): JSX.Element {
    const props: Props = this.props as Props;

    const trainingAtom: Atom<Training | null> = props.training;
    const activeTrainingAtom: Atom<Training | null> = props.activeTraining;

    this.event = props.event;

    const dataObservable: Observable<Array<Training | null>> = Observable.combineLatest(
      trainingAtom,
      activeTrainingAtom
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
      <F.div
        onClick={() => this.onClick()}
        className={'training card ' + activeClassName}
      >
        <div>
          <h2 className="training__title">{this.training.name}</h2>
          <div className="training__data">
            <F.div className="training__data__single">
              Distance: <span className="mark">{this.training.distance}</span>{' '}
              <span className="training__data__additional">km,</span>
            </F.div>
            <F.div className="training__data__single">
              Pace: <span className="mark">{this.training.pace}</span>{' '}
              <span className="training__data__additional">min/km</span>,
            </F.div>
            <div className="training__data__single">
              Time: <span className="mark">{this.training.time}</span>
            </div>
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
    return (<div key={`additional-${training.id}`}>Loading...</div>);
  }

  private isExistObservableData([training]: Array<Training | null>): boolean {
    return !!training;
  }

  private isEmptyObservableData([training, activeTraining]: Array<Training | null>): boolean {
    return !this.isExistObservableData([training, activeTraining]);
  }

  private isActiveTraining(): boolean {
    return !!this.training && this.training === this.activeTraining;
  }

  private onClick(): void {
    if (this.isActiveTraining()) {
      this.event.set(new AppEvent(AppService.ACTION_ACTIVE_TRAINING_RESET));
    } else {
      this.event.set(new AppEvent(AppService.ACTION_ACTIVE_TRAINING_SET, this.training));
    }
  }
}
