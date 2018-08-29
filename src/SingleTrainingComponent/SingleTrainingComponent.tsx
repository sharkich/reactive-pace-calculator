import * as React from 'react';
import {Observable} from 'rxjs/Observable';
import {filter, map, merge} from 'rxjs/operators';
import {Atom, classes, F} from '@grammarly/focal';

// tslint:disable-next-line
import './SingleTraining.css';

import {Training} from '../TrainingsListComponent/training.model';

interface Props {
  training: Atom<Training | null>;
  activeTraining: Atom<Training | null>;
}

export class SingleTrainingComponent extends React.Component {
  render(): JSX.Element {
    const props: Props = this.props as Props;
    const trainingAtom: Atom<Training | null> = props.training;
    const activeTrainingAtom: Atom<Training | null> = props.activeTraining;
    return (
      <F.div className="training card">
        {trainingAtom.view((training: Training | null) => {
          if (!training) {
            return <div>Loading...</div>;
          }

          return (
            <F.div
              {...classes(
                activeTrainingAtom.view(
                  (activeTraining: Training) => activeTraining === training && 'training--active'
                )
              )}
            >
              <div className="training__main">
                <h2 className="training__main__title">Monday Training</h2>
                <div className="training__data">
                  <F.div className="training__data__single">
                    Distance: <span className="mark">{training.distance}</span>{' '}
                    <span className="training__data__additional">km,</span>
                  </F.div>
                  <F.div className="training__data__single">
                    Pace: <span className="mark">{training.pace}</span>{' '}
                    <span className="training__data__additional">min/km</span>,
                  </F.div>
                  <div className="training__data__single">
                    Time: <span className="mark">{training.time}</span>
                  </div>
                </div>
              </div>
              {this.renderAdditional()}
            </F.div>
          );
        })}
      </F.div>
    );
  }

  renderAdditional(): Observable<JSX.Element> {
    const props: Props = this.props as Props;
    const trainingAtom: Atom<Training | null> = props.training;
    const activeTrainingAtom: Atom<Training | null> = props.activeTraining;

    const dataObservable: Observable<Array<Training | null>> = Observable.combineLatest(
      trainingAtom,
      activeTrainingAtom
    );

    const existObservable: Observable<JSX.Element> = dataObservable.pipe(
      filter(this.isExistObservableData.bind(this)),
      map(([training]: Training[]) => (
        <div key={`additional-${training.id}`} className="training__additional">
          <p>
            Speed: <span className="mark">10.00</span>{' '}
            <span className="training__data__additional">km/h</span>,
            <span className="grey"> ID: {training.id}</span>
          </p>
        </div>
      ))
    );

    const emptyObservable: Observable<JSX.Element> = dataObservable.pipe(
      filter(this.isEmptyObservableData.bind(this)),
      map(([training]: Training[]) => (<div key={`additional-${training.id}`} />))
    );

    return existObservable.pipe(merge(emptyObservable));
  }

  private isExistObservableData([training, activeTraining]: Array<Training | null>): boolean {
    return !!training && training === activeTraining;
  }

  private isEmptyObservableData([training, activeTraining]: Array<Training | null>): boolean {
    return !this.isExistObservableData([training, activeTraining]);
  }
}
