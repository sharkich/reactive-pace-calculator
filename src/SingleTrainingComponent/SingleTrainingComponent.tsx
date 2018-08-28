import * as React from 'react';
import {Atom, F} from '@grammarly/focal';

// tslint:disable-next-line
import './SingleTraining.css';

import {Training} from '../TrainingsListComponent/training.model';

export function SingleTrainingComponent(props: {training: Atom<Training | null>}): JSX.Element {
  return (
    <F.div className="training card">
      {props.training.view((training: Training | null) => {
        if (!training) {
          return <div>Loading...</div>;
        }
        return (
          <div>
            <div className="training__main">
              <h2 className="training__main__title">Monday Training</h2>
              <div className="training__data">
                <F.div className="training__data__single">
                  Distance:{' '}
                  <mark>{training.distance}</mark>{' '}
                  <span className="training__data__additional">km,</span>
                </F.div>
                <F.div className="training__data__single">
                  Pace:{' '}
                  <mark>{training.pace}</mark>{' '}
                  <span className="training__data__additional">min/km</span>,
                </F.div>
                <div className="training__data__single">
                  Time:{' '}
                  <mark>{training.time}</mark>
                </div>
              </div>
            </div>
            <div className="training__additional">
              <F.p>
                Speed:{' '}
                <mark>10.00</mark>{' '}
                <span className="training__data__additional">km/h</span>,
                <F.span className="grey"> ID: {training.id}</F.span>
              </F.p>
            </div>
          </div>
        );
      })}
    </F.div>
  );
}
