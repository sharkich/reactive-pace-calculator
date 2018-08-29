import * as React from 'react';
import {Atom, F} from '@grammarly/focal';
import {Observable} from 'rxjs/Observable';
import {filter, map, merge} from 'rxjs/operators';

// tslint:disable-next-line
import './TrainingFooterComponent.css';

import {Training} from '../_shared/Training.model';
import {Props} from '../TrainingComponent/TrainingComponent';

export class TrainingFooterComponent extends React.Component {
  render(): JSX.Element {
    const props: Props = this.props as Props;
    const trainingAtom: Atom<Training | null> = props.training;
    const activeTrainingAtom: Atom<Training | null> = props.activeTraining;

    const dataObservable: Observable<Array<Training | null>> = Observable.combineLatest(
      trainingAtom,
      activeTrainingAtom
    );

    const existObservable: Observable<JSX.Element> = dataObservable.pipe(
      filter(this.isExistObservableData),
      map(([training]: Training[]) => this.additionalView(training))
    );

    const emptyObservable: Observable<JSX.Element> = dataObservable.pipe(
      filter(this.isEmptyObservableData.bind(this)),
      map(([training]: Training[]) => <div key={`additional-${training.id}`} />)
    );

    return <F.div>{existObservable.pipe(merge(emptyObservable))}</F.div>;
  }

  private additionalView(training: Training): JSX.Element {
    return (
      <div key={`additional-${training.id}`} className="training__additional">
        <div className="training__data__single">
          Speed: <span className="mark">10.00</span>{' '}
          <span className="training__data__additional">km/h</span>,
        </div>
        <div>
          <span className="grey"> ID: {training.id}</span>
        </div>
      </div>
    );
  }

  private isExistObservableData([training, activeTraining]: Array<Training | null>): boolean {
    return !!training && training === activeTraining;
  }

  private isEmptyObservableData([training, activeTraining]: Array<Training | null>): boolean {
    return !this.isExistObservableData([training, activeTraining]);
  }
}
