import * as React from 'react';
import {Atom, F} from '@grammarly/focal';

// tslint:disable-next-line
import './Training.css';

import {Training} from '../TrainingsListComponent/training.model';

export function SingleTrainingComponent(props: { training: Atom<Training | null> }): JSX.Element {
  return (
    <div className="training card">
      <div className="training__main">
        <h2 className="training__main__title">Monday Training</h2>
        <div className="training__data">
          <div className="training__data__single">
            Distance: <mark>21.097</mark> km,
          </div>
          <div className="training__data__single">
            Pace: <mark>06:00</mark> <span>min/km</span>,
          </div>
          <div className="training__data__single">
            Time: <mark>02:06:35</mark>
          </div>
        </div>
      </div>
      <div className="training__additional">
        <p>
          Speed: <mark>10.00</mark> <span>km/h</span>,
          <F.span className="grey">
            {' '}ID: {props.training.view((x: Training | null) => x && x.id)}
          </F.span>
        </p>
      </div>
    </div>
  );
}
