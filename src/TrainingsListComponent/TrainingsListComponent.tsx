import * as React from 'react';

import {Training, Trainings} from './training.model';
import {Atom, F} from '@grammarly/focal';

export function TrainingsListComponent(props: {trainings: Atom<Trainings>}): JSX.Element {
  return (
    <F.div className="card">
      <h2>Trainings</h2>
      {props.trainings.view((trainings: Trainings) => {
        if (!trainings) {
          return <div className="card">No Trainings</div>;
        }
        return Object.keys(trainings).map((id: string) => {
          const training: Training = trainings[id];
          return (
            <div className="card" key={training.id}>
              <div>ID: [{training.id}]</div>
            </div>
          );
        });
      })}
    </F.div>
  );
}
